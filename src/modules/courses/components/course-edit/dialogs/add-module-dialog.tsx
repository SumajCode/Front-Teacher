"use client"

import { useState } from "react"
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
import { docenteMock } from "@/lib/docenteMock"

interface AddModuleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onModuleCreated: (id: string) => void
  courseId: string
}

export function AddModuleDialog({
  open,
  onOpenChange,
  onModuleCreated,
  courseId,
}: AddModuleDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    const body = {
      data: {
        id_docente: docenteMock.id,
        id_materia: parseInt(courseId),
        title,
        desciption: description, // <- mal escrito intencionalmente según la API
      },
      todo: "False",
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

      const newModuleId = result?.data?._id || result?.data?.id || null
      if (newModuleId) {
        console.log("ID del módulo guardado:", newModuleId)
        onModuleCreated(newModuleId) // ✅ Se pasa al padre correctamente
      } else {
        console.warn("No se pudo extraer el ID del módulo de la respuesta.")
      }

      onOpenChange(false)

    } catch (error) {
      console.error("Error al crear el módulo:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="relative">
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
