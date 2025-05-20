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
import { Switch } from "@/components/ui/switch"

interface AddStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir estudiante</DialogTitle>
          <DialogDescription>Añade un nuevo estudiante a este curso</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="student-email">Email del estudiante</Label>
            <Input
              id="student-email"
              type="email"
              placeholder="estudiante@ejemplo.com"
              className="border-purple-200 focus-visible:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label htmlFor="student-name">Nombre</Label>
              <Input
                id="student-name"
                placeholder="Nombre del estudiante"
                className="border-purple-200 focus-visible:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="student-lastname">Apellido</Label>
              <Input
                id="student-lastname"
                placeholder="Apellido del estudiante"
                className="border-purple-200 focus-visible:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="send-invitation">Enviar invitación</Label>
              <p className="text-sm text-muted-foreground">Enviar email de invitación al estudiante</p>
            </div>
            <Switch id="send-invitation" defaultChecked />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => onOpenChange(false)}>
            Añadir estudiante
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
