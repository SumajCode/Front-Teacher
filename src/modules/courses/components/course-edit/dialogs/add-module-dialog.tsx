"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAutosave } from "@/modules/courses/hooks/use-autosave"
import { AutosaveIndicator } from "@/modules/courses/components/ui/autosave-indicator"
import { docenteMock } from "@/lib/docenteMock"

interface AddModuleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseId: string // ID del curso al que se añadirá el módulo
}

const AUTOSAVE_KEY = "add_module_autosave"

export function AddModuleDialog({
  open,
  onOpenChange,
  courseId,
}: AddModuleDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Datos para autoguardar
  const formData = {
    title,
    description,
  }

  // Usar el hook de autoguardado
  const {
    isAutosaving,
    hasAutosavedData,
    loadAutosavedData,
    resetAutosavedData,
  } = useAutosave({
    key: AUTOSAVE_KEY,
    data: formData,
  })

  // Cargar datos autoguardados al abrir el modal
  useEffect(() => {
    if (open) {
      const savedData = loadAutosavedData()
      if (savedData) {
        setTitle(savedData.title || "")
        setDescription(savedData.description || "")
      }
    }
  }, [open])

  const handleSubmit = async () => {
    const body = {
      data: {
        id_docente: docenteMock.id, // o usa una variable si lo necesitas dinámico
        id_materia: parseInt(courseId), // lo mismo aquí
        title,
        desciption: description, // 👈 debe escribirse así, con 'c'
      },
      todo: "False", // 👈 debe ser string, no booleano
    }

    console.log("Creando módulo con:", body)

    try {
      const response = await fetch(
        "https://microservice-content.onrender.com/apicontenido/v1/modulo/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log("Módulo creado:", result)

      // Puedes pasar el nuevo módulo al padre si quieres
      // onCreate?.(result)

      resetAutosavedData()
      onOpenChange(false)
    } catch (error) {
      console.error("Error al crear el módulo:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="relative">
          <div className="absolute right-0 top-0">
            <AutosaveIndicator
              isAutosaving={isAutosaving}
              hasAutosavedData={hasAutosavedData}
              onReset={resetAutosavedData}
            />
          </div>
          <DialogTitle>Añadir nuevo módulo</DialogTitle>
          <DialogDescription>
            Crea un nuevo módulo para tu curso
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="module-title">Título del módulo</Label>
            <Input
              id="module-title"
              placeholder="Ej: Introducción a HTML y CSS"
              className="border-blue-200 focus-visible:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="module-description">Descripción (opcional)</Label>
            <Textarea
              id="module-description"
              placeholder="Describe este módulo..."
              className="border-blue-200 focus-visible:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={!title}
          >
            Añadir módulo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
