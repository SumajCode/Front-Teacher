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
import { getResourceIcon } from "@/modules/courses/utils/course-helpers"
import type { ContentItem } from "@/modules/courses/types"
import { useState, useEffect } from "react"

interface AssignmentWithResources extends ContentItem {
  resources?: {
    id: string
    name: string
    type: string
  }[]
  id: string
}

interface EditAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: AssignmentWithResources | null
  activeTab: string
  setActiveTab: (tab: string) => void
  newResourceName: string
  setNewResourceName: (name: string) => void
  onAddResource: (resourceName: string, lesson: AssignmentWithResources) => void
  onDeleteResource: (resourceId: string, lessonId: string) => void
  moduleId: string
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
  moduleId,
}: EditAssignmentDialogProps) {
  // Hooks siempre al top-level
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [points, setPoints] = useState<string>("")
  const [timeDeliver, setTimeDeliver] = useState<string>("")

  useEffect(() => {
    if (!assignment) return
    setTitle(assignment.title)
    setDescription(assignment.content?.description || "")
    setPoints(assignment.content?.points?.toString() || "")
    setTimeDeliver(
      assignment.time_deliver
        ? new Date(assignment.time_deliver).toISOString().slice(0, 16)
        : ""
    )
  }, [assignment])

  // Si no hay assignment, retorna null (después de los hooks)
  if (!assignment) return null

  const handleSubmit = async () => {
    const payload = {
      todo: false,
      data: {
        id_modulo: moduleId,
        title: title,
        type: "tarea",
      },
    }

    console.log("Payload que se enviará:", payload)

    try {
      const response = await fetch(
        "https://microservice-content.onrender.com/apicontenido/v1/archivo/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log("Tarea editada exitosamente:", result)

      onOpenChange(false) // ✅ Cierra el diálogo solo si todo va bien
    } catch (error) {
      console.error("Error al editar la tarea:", error)
    }
  }

  // Reemplazo los íconos de Lucide por SVGs inline para evitar errores de tipado
  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
  const UploadIcon = () => (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 9l5-5 5 5" />
      <path d="M12 4v12" />
    </svg>
  )
  const DownloadIcon = () => (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
  const TrashIcon = () => (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 6h18" />
      <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
    </svg>
  )

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
            <TabsTrigger value="resources">Recursos</TabsTrigger>
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
                  <PlusIcon />
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
                  <UploadIcon />
                  Subir
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h4 className="font-medium mb-2">Recursos actuales</h4>
              {assignment.resources && assignment.resources.length > 0 ? (
                <div className="space-y-2">
                  {assignment.resources.map(
                    (resource: { id: string; name: string; type: string }) => (
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
                            <DownloadIcon />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                            onClick={() =>
                              onDeleteResource(resource.id, assignment.id)
                            }
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                      </div>
                    )
                  )}
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
            onClick={handleSubmit}
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
