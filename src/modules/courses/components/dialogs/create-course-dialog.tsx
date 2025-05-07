'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCourseDialog({ open, onOpenChange }: CreateCourseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Crear nuevo curso</DialogTitle>
          <DialogDescription>
            Completa la información básica para crear tu nuevo curso. Podrás añadir más detalles
            después.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título del curso *</Label>
            <Input
              id="title"
              placeholder="Ej: Desarrollo Web Completo"
              className="border-blue-200 focus-visible:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subtitle">Subtítulo *</Label>
            <Input
              id="subtitle"
              placeholder="Ej: Aprende HTML, CSS, JavaScript, PHP y más"
              className="border-blue-200 focus-visible:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe tu curso..."
              className="min-h-[100px] border-blue-200 focus-visible:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select>
              <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Desarrollo Web</SelectItem>
                <SelectItem value="mobile">Desarrollo Móvil</SelectItem>
                <SelectItem value="design">Diseño</SelectItem>
                <SelectItem value="business">Negocios</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/courses/new">Continuar</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
