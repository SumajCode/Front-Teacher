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
import { AlertTriangle } from "lucide-react"

interface DeleteModuleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  moduleId: string | null
  onConfirm: (moduleId: string) => void
}

export function DeleteModuleDialog({
  open,
  onOpenChange,
  moduleId,
  onConfirm,
}: DeleteModuleDialogProps) {
  if (!moduleId) return null
  const onDelete = async (id: any) => {
    console.log("iasdasd", id._id)
    const body = {
      filter: { _id: id._id },
      todo: false,
    }
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
      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting module:", error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Eliminar módulo</DialogTitle>
          </div>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este módulo? Esta acción no se
            puede deshacer y se eliminarán todas las lecciones y recursos
            asociados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-center">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(moduleId)}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            Eliminar módulo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
