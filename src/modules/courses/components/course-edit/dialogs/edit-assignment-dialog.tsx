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
import type { ContentItem } from "@/modules/courses/types"
import { useState, useEffect } from "react"

interface EditAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: ContentItem | null
  activeTab: string
  setActiveTab: (tab: string) => void
  newResourceName: string
  setNewResourceName: (name: string) => void
  onAddResource: (resourceName: string, lesson: ContentItem) => void
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

  // State for dialog fields
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [points, setPoints] = useState<string>("")
  const [timeDeliver, setTimeDeliver] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  // Initialize when assignment changes
  useEffect(() => {
    setTitle(assignment.title)
    setDescription(assignment.content.description || "")
    setPoints(assignment.content.points?.toString() || "")
    setStatus(assignment.content.status || "")
    setTimeDeliver(
      assignment.time_deliver
        ? new Date(assignment.time_deliver).toISOString().slice(0, 16)
        : ""
    )
  }, [assignment])
  const handleSubmit = () => {
    console.log("Tarea actualizada:", {
      title,
      description,
      points,
      timeDeliver,
    })

    // onOpenChange(false)
  }

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
          <DialogDescription>
            Configura los detalles y tiempos
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            {/* <TabsTrigger value="resources">Recursos</TabsTrigger> */}
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="assignment-title">Título</Label>
              <Input
                id="assignment-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-description">Descripción</Label>
              <Textarea
                id="assignment-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-points">Puntos</Label>
              <Input
                id="assignment-points"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignment-time-deliver">Fecha de entrega</Label>
              <Input
                id="assignment-time-deliver"
                type="datetime-local"
                value={timeDeliver}
                onChange={(e) => setTimeDeliver(e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="assignment-resource-name">
                Nombre del recurso
              </Label>
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
                <Button
                  variant="outline"
                  className="border-amber-200 text-amber-600 hover:bg-amber-50"
                >
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
                    <div
                      key={resource.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
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
                          onClick={() =>
                            onDeleteResource(resource.id, assignment.id)
                          }
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No hay recursos para esta evaluación
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => handleSubmit()}
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
