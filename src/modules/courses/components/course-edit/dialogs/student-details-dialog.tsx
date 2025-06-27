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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Student, Module } from "@/modules/courses/types"

interface StudentDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student | null
  modules: Module[]
}

export function StudentDetailsDialog({ open, onOpenChange, student, modules }: StudentDetailsDialogProps) {
  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Detalles del estudiante</DialogTitle>
          <DialogDescription>Información detallada y progreso del estudiante</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${student.name.charAt(0)}`} />
              <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Progreso del curso</h4>
            <div className="flex items-center gap-2">
              <Progress value={student.progress} className="h-2 flex-1" />
              <span className="font-medium">{student.progress}%</span>
            </div>
            <p className="text-sm text-muted-foreground">Última actividad: {student.lastActive}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Módulos completados</h4>
            <div className="space-y-2">
              {modules.map((module, index) => (
                <div key={module._id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{module.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 ? "Completado" : index === 1 ? "En progreso" : "No iniciado"}
                    </p>
                  </div>
                  <Progress value={index === 0 ? 100 : index === 1 ? 45 : 0} className="h-2 w-24" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Calificaciones</h4>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-2">Evaluación</th>
                  <th className="pb-2">Tipo</th>
                  <th className="pb-2">Calificación</th>
                  <th className="pb-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Cuestionario inicial</td>
                  <td className="py-2">Cuestionario</td>
                  <td className="py-2">85%</td>
                  <td className="py-2">
                    <Badge className="bg-green-500">Completado</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Tarea práctica: Implementación básica</td>
                  <td className="py-2">Tarea</td>
                  <td className="py-2">78%</td>
                  <td className="py-2">
                    <Badge className="bg-green-500">Completado</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Examen final del módulo</td>
                  <td className="py-2">Examen</td>
                  <td className="py-2">-</td>
                  <td className="py-2">
                    <Badge variant="outline">Pendiente</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Enviar mensaje</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
