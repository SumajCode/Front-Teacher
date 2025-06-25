"use client"

import { useEffect, useState, ChangeEvent, DragEvent } from "react"
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
import { Download, Trash, Upload, X } from "lucide-react"
import { getResourceIcon } from "@/modules/courses/utils/course-helpers"
import { useAutosave } from "@/modules/courses/hooks/use-autosave"
import { AutosaveIndicator } from "@/modules/courses/components/ui/autosave-indicator"
// Accept any content item structure
// import type { Lesson } from "@/modules/courses/types"

interface EditLessonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lesson: any | null
  activeTab: string
  setActiveTab: (tab: string) => void
  newResourceName: string
  setNewResourceName: (name: string) => void
  onAddResource: (resourceName: string, lesson: Lesson) => void

  onDeleteResource: (resourceId: string, lessonId: string) => void
}

export function EditLessonDialog({
  open,
  onOpenChange,
  lesson,
  activeTab,
  setActiveTab,
  newResourceName,
  setNewResourceName,
  onAddResource,
  onDeleteResource,
}: EditLessonDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [points, setPoints] = useState("")
  const [timeDeliver, setTimeDeliver] = useState("")

  // Clave única para este formulario basada en el ID de la lección
  const autosaveKey = lesson
    ? `edit_lesson_${lesson.id}_autosave`
    : "edit_lesson_autosave"

  // Datos para autoguardar
  const formData = {
    title,
    description,
    points,
    timeDeliver,
    activeTab,
    newResourceName,
  }

  // Usar el hook de autoguardado
  const {
    isAutosaving,
    hasAutosavedData,
    loadAutosavedData,
    resetAutosavedData,
  } = useAutosave({
    key: autosaveKey,
    data: formData,
  })

  // Cargar datos de la lección cuando cambia
  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title)
      // Map description from content JSON
      setDescription(lesson.content?.description || "")
      setPoints(lesson.content?.points?.toString() || "")
      setTimeDeliver(
        lesson.time_deliver
          ? new Date(lesson.time_deliver).toISOString().slice(0, 16)
          : ""
      )
    }
  }, [lesson])

  // Cargar datos autoguardados al abrir el modal
  useEffect(() => {
    if (open && lesson) {
      const savedData = loadAutosavedData()
      if (savedData) {
        setTitle(savedData.title || lesson.title)
        setDescription(savedData.description || "")
        setActiveTab(savedData.activeTab || "details")
        setNewResourceName(savedData.newResourceName || "")
      }
    }
  }, [open, lesson])

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Lección actualizada:", {
      title,
      description,
      points,
      timeDeliver,
      resources: lesson?.resources,
    })

    // Limpiar datos autoguardados
    resetAutosavedData()

    // Cerrar el diálogo
    onOpenChange(false)
  }

  // Estado y handlers para preview de video
  //usar el file para el backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleVideoFile(files[0])
    }
  }
  const handleVideoFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    }
  }
  const handleVideoDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleVideoDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleVideoFile(files[0])
    }
  }
  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    setVideoFile(null)
    setVideoPreview(null)
  }

  if (!lesson) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="relative">
          <div className="absolute right-0 top-0">
            <AutosaveIndicator
              isAutosaving={isAutosaving}
              hasAutosavedData={hasAutosavedData}
              onReset={resetAutosavedData}
            />
          </div>
          <DialogTitle>Editar lección</DialogTitle>
          <DialogDescription>
            Modifica los detalles de esta lección
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="lesson-title">Título</Label>
              <Input
                id="lesson-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lesson-description">Descripción</Label>
              <Textarea
                id="lesson-description"
                placeholder="Describe esta lección..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lesson-points">Puntos</Label>
              <Input
                id="lesson-points"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lesson-time-deliver">Fecha de entrega</Label>
              <Input
                id="lesson-time-deliver"
                type="datetime-local"
                value={timeDeliver}
                onChange={(e) => setTimeDeliver(e.target.value)}
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lesson-video">Video</Label>
              {!videoPreview ? (
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-md p-6 cursor-pointer hover:border-blue-400 transition"
                  onDragOver={handleVideoDragOver}
                  onDrop={handleVideoDrop}
                  onClick={() =>
                    document.getElementById("lesson-video")?.click()
                  }
                >
                  <Upload className="mb-2 h-8 w-8 text-blue-400" />
                  <span className="text-blue-600 font-medium mb-1">
                    Arrastra o haz click para subir video
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sólo videos (Recomendado: MP4)
                  </span>
                  <Input
                    id="lesson-video"
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleVideoFileChange}
                  />
                </div>
              ) : (
                <div className="relative">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-auto rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeVideo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="resource-files">
                Arrastra y suelta archivos aquí
              </Label>
              <input
                id="resource-files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  files.forEach((file) => onAddResource(file.name, lesson))
                  e.target.value = "" // Reset input for same file upload
                }}
              />
              <div
                className="border-2 border-dashed border-blue-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
                onClick={() =>
                  document.getElementById("resource-files")?.click()
                }
                onDrop={(e) => {
                  e.preventDefault()
                  const files = Array.from(e.dataTransfer.files)
                  files.forEach((file) => onAddResource(file.name, lesson))
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="h-8 w-8 text-blue-400 mb-2" />
                <span className="text-blue-600 font-medium">
                  Haz clic o arrastra archivos para añadir
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Puedes añadir varios archivos a la vez
                </span>
              </div>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h4 className="font-medium mb-2">Recursos actuales</h4>
              {lesson.resources && lesson.resources.length > 0 ? (
                <div className="space-y-2">
                  {lesson.resources.map((resource) => (
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
                          className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={() =>
                            onDeleteResource(resource.id, lesson.id)
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
                  No hay recursos para esta lección
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
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
