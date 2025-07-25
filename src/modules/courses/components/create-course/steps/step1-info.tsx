"use client"

import React from "react"
import { BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Step1InfoProps {
  title: string
  setTitle: (value: string) => void
  nivelEstudio: string
  setNivelEstudio: (value: string) => void
}

export function Step1Info({
  title,
  setTitle,
  nivelEstudio,
  setNivelEstudio,
}: Step1InfoProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-blue-800">
            Información básica
          </h3>
          <p className="text-sm text-gray-500">
            Comienza con la información básica de tu curso
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="title" className="text-blue-700">
          Título del curso *
        </Label>
        <Input
          id="title"
          placeholder="Ej: Desarrollo Web Completo"
          required
          className="border-blue-200 focus-visible:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="nivel" className="text-blue-700">
          Nivel de estudio *
        </Label>
        <select
          id="nivel"
          className="border border-blue-200 focus-visible:ring-blue-500 rounded-md px-3 py-2"
          required
          value={nivelEstudio}
          onChange={(e) => setNivelEstudio(e.target.value)}
        >
          <option value="" disabled>Selecciona un nivel...</option>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>
    </div>
  )
}
