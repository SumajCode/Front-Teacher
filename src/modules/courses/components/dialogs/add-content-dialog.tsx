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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  CheckSquare,
  ClipboardList,
  FileCheck,
  Plus,
  Upload,
  Video,
} from "lucide-react"
import { useResources } from "@/modules/courses/hooks/use-resources"

interface AddContentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentType: string
  setContentType: (type: string) => void
}

export function AddContentDialog({
  open,
  onOpenChange,
  contentType,
  setContentType,
}: AddContentDialogProps) {
  const {
    resources,
    newResourceName,
    setNewResourceName,
    handleAddResource,
    handleRemoveResource,
    getResourceIcon,
  } = useResources()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Añadir contenido</DialogTitle>
          <DialogDescription>
            Selecciona el tipo de contenido que deseas añadir
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            value={contentType}
            onValueChange={setContentType}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="lesson"
                id="lesson"
                className="peer sr-only"
              />
              <Label
                htmlFor="lesson"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50"
              >
                <Video className="mb-2 h-6 w-6 text-blue-500" />
                <div className="font-medium">Lección</div>
                <div className="text-xs text-muted-foreground">
                  Añadir video o contenido
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="quiz" id="quiz" className="peer sr-only" />
              <Label
                htmlFor="quiz"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50 [&:has([data-state=checked])]:border-amber-500 [&:has([data-state=checked])]:bg-amber-50"
              >
                <CheckSquare className="mb-2 h-6 w-6 text-amber-500" />
                <div className="font-medium">Cuestionario</div>
                <div className="text-xs text-muted-foreground">
                  Añadir preguntas de evaluación
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="assignment"
                id="assignment"
                className="peer sr-only"
              />
              <Label
                htmlFor="assignment"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-emerald-500 [&:has([data-state=checked])]:bg-emerald-50"
              >
                <ClipboardList className="mb-2 h-6 w-6 text-emerald-500" />
                <div className="font-medium">Tarea</div>
                <div className="text-xs text-muted-foreground">
                  Añadir tarea práctica
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="exam" id="exam" className="peer sr-only" />
              <Label
                htmlFor="exam"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 [&:has([data-state=checked])]:bg-rose-50"
              >
                <FileCheck className="mb-2 h-6 w-6 text-rose-500" />
                <div className="font-medium">Examen</div>
                <div className="text-xs text-muted-foreground">
                  Añadir evaluación final
                </div>
              </Label>
            </div>
          </RadioGroup>

          {contentType === "lesson" && (
            <div className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="lesson-title">Título de la lección</Label>
                <Input
                  id="lesson-title"
                  placeholder="Ej: Introducción a HTML"
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-description">Descripción</Label>
                <Textarea
                  id="lesson-description"
                  placeholder="Describe esta lección..."
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-video">Video</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="lesson-video"
                    type="file"
                    accept="video/*"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Subir
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(contentType === "quiz" ||
            contentType === "assignment" ||
            contentType === "exam") && (
            <div className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="assignment-title">Título</Label>
                <Input
                  id="assignment-title"
                  placeholder={`Ej: ${contentType === "quiz" ? "Cuestionario de conceptos básicos" : contentType === "assignment" ? "Tarea práctica" : "Examen final"}`}
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
                  placeholder="Ej: 30 min, 2 horas, etc."
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignment-open">Fecha de apertura</Label>
                  <Input
                    id="assignment-open"
                    type="datetime-local"
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-close">Fecha de cierre</Label>
                  <Input
                    id="assignment-close"
                    type="datetime-local"
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-publish">Fecha de publicación</Label>
                <Input
                  id="assignment-publish"
                  type="datetime-local"
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>

              {/* Sección de recursos para tareas y exámenes */}
              <div className="border-t pt-4 mt-6">
                <h3 className="font-medium mb-2">Recursos</h3>
                <div className="grid gap-2">
                  <Label htmlFor="resource-name">Nombre del recurso</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="resource-name"
                      placeholder="Ej: Instrucciones.pdf"
                      className="border-amber-200 focus-visible:ring-amber-500"
                      value={newResourceName}
                      onChange={(e) => setNewResourceName(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="border-amber-200 text-amber-600 hover:bg-amber-50"
                      onClick={handleAddResource}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Añadir
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="resource-file">Archivo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="resource-file"
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

                {/* Lista de recursos añadidos */}
                {resources.length > 0 && (
                  <div className="mt-4 border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">
                      Recursos añadidos
                    </h4>
                    <div className="space-y-2">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <span className="text-sm">{resource.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                            onClick={() => handleRemoveResource(resource.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className={
              contentType === "lesson"
                ? "bg-blue-600 hover:bg-blue-700"
                : contentType === "quiz"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : contentType === "assignment"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-600 hover:bg-rose-700"
            }
            onClick={() => onOpenChange(false)}
          >
            Añadir{" "}
            {contentType === "lesson"
              ? "lección"
              : contentType === "quiz"
                ? "cuestionario"
                : contentType === "assignment"
                  ? "tarea"
                  : "examen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
