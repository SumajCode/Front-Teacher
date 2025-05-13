"use client"

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
import { useEffect, useState } from "react"
import type { Module } from "@/modules/courses/types"

interface EditModuleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  module: Module | null
}

export function EditModuleDialog({ open, onOpenChange, module }: EditModuleDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (module) {
      setTitle(module.title)
      setDescription("") // Asumimos que no hay descripción en el modelo actual
    }
  }, [module])

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    onOpenChange(false)
  }

  if (!module) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-blue-700">Editar módulo</DialogTitle>
          <DialogDescription>Modifica los detalles del módulo</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="module-title" className="text-blue-600">
              Título del módulo
            </Label>
            <Input
              id="module-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-blue-200 focus-visible:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="module-description" className="text-blue-600">
              Descripción (opcional)
            </Label>
            <Textarea
              id="module-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe este módulo..."
              className="border-blue-200 focus-visible:ring-blue-500"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            onClick={handleSave}
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
