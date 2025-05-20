"use client"

import React from "react"
import type { ChangeEvent, DragEvent } from "react"
import { ImageIcon, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface Step2ImageProps {
  imagePreview: string | null
  setImagePreview: (value: string | null) => void
  setImageFile: (value: File | null) => void
}

export function Step2Image({
  imagePreview,
  setImagePreview,
  setImageFile,
}: Step2ImageProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.add("border-indigo-400", "bg-indigo-100")
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("border-indigo-400", "bg-indigo-100")
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("border-indigo-400", "bg-indigo-100")

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg">
          <ImageIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-indigo-800">
            Imagen del curso
          </h3>
          <p className="text-sm text-gray-500">
            Añade una imagen atractiva para tu curso
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="course-image" className="text-indigo-700">
          Imagen de portada *
        </Label>

        {!imagePreview ? (
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-md p-8 bg-indigo-50 transition-colors duration-200"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-12 w-12 text-indigo-500" />
              <p className="text-sm font-medium text-indigo-700">
                Arrastra y suelta una imagen aquí
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG o JPEG (Recomendado: 1280x720px)
              </p>
              <div className="relative mt-4">
                <Button
                  variant="outline"
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  Seleccionar archivo
                </Button>
                <Input
                  id="course-image"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative rounded-md overflow-hidden border border-indigo-200">
            <Image
              width={250}
              height={150}
              src={imagePreview || "/placeholder.svg"}
              alt="Vista previa"
              className="w-full h-auto max-h-[200px] object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full opacity-90 hover:opacity-100"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
