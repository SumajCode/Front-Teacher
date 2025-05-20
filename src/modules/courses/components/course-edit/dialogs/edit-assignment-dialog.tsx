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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Download, Plus, Trash, Upload } from "lucide-react"
import { getResourceIcon } from "@/modules/courses/utils/course-helpers"
import type { Lesson } from "@/modules/courses/types"

interface EditAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: Lesson | null
  activeTab: string
  setActiveTab: (tab: string) => void
  newResourceName: string
  setNewResourceName: (name: string) => void
  onAddResource: (resourceName: string, lesson: Lesson) => void
  onDeleteResource: (resourceId: string, lessonId: string) => void
}

export function EditAssignmentDialog({
  open,
  onOpenChange,
  assignment,
  activeTab,
  setActiveTab,
  newResourceName,
  setNewResourceName,
  onAddResource,
  onDeleteResource,
}: EditAssignmentDialogProps) {
  if (!assignment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {assignment.type === "quiz"
              ? "Editar cuestionario"
              : assignment.type === "assignment"
                ? "Editar tarea"
                : "Editar examen"}
          </DialogTitle>
          <DialogDescription>Configura los detalles y tiempos</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="assignment-title">Título</Label>
              <Input
                id="assignment-title"
                defaultValue={assignment.title}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-description">Descripción</Label>
              <Textarea
                id="assignment-description"
                placeholder="Describe esta actividad..."
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-duration">Duración</Label>
              <Input
                id="assignment-duration"
                defaultValue={assignment.duration}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="assignment-open">Fecha de apertura</Label>
                <Input
                  id="assignment-open"
                  type="datetime-local"
                  defaultValue={assignment.openDate}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-close">Fecha de cierre</Label>
                <Input
                  id="assignment-close"
                  type="datetime-local"
                  defaultValue={assignment.closeDate}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-publish">Fecha de publicación</Label>
              <Input
                id="assignment-publish"
                type="datetime-local"
                defaultValue={assignment.publishDate}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="assignment-attempts">Intentos múltiples</Label>
                <p className="text-sm text-muted-foreground">Permitir múltiples intentos</p>
              </div>
              <Switch id="assignment-attempts" />
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="assignment-resource-name">Nombre del recurso</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="assignment-resource-name"
                  placeholder="Ej: Instrucciones de la tarea.pdf"
                  className="border-amber-200 focus-visible:ring-amber-500"
                  value={newResourceName}
                  onChange={(e) => setNewResourceName(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="border-amber-200 text-amber-600 hover:bg-amber-50"
                  onClick={() => onAddResource(newResourceName, assignment)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-resource-file">Archivo</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="assignment-resource-file"
                  type="file"
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
                <Button variant="outline" className="border-amber-200 text-amber-600 hover:bg-amber-50">
                  <Upload className="mr-2 h-4 w-4" />
                  Subir
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h4 className="font-medium mb-2">Recursos actuales</h4>
              {assignment.resources && assignment.resources.length > 0 ? (
                <div className="space-y-2">
                  {assignment.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <span>{resource.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={() => onDeleteResource(resource.id, assignment.id)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No hay recursos para esta evaluación</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => onOpenChange(false)}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
