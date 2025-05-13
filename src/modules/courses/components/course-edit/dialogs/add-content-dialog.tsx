"use client"

import { useState, useEffect } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckSquare,
  ClipboardList,
  FileCheck,
  Upload,
  Video,
  ChevronRight,
  ChevronLeft,
  Plus,
  File,
  FileText,
  Trash,
} from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { useAutosave } from "@/modules/courses/hooks/use-autosave"
import { AutosaveIndicator } from "@/modules/courses/components/ui/autosave-indicator"

interface AddContentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentType: string
  setContentType: (type: string) => void
  currentModuleId: string | null
}

const AUTOSAVE_KEY = "add_content_autosave"

export function AddContentDialog({
  open,
  onOpenChange,
  contentType,
  setContentType,
  currentModuleId,
}: AddContentDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [openDate, setOpenDate] = useState("")
  const [closeDate, setCloseDate] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [resources, setResources] = useState<{ id: string; name: string; type: string }[]>([])
  const [newResourceName, setNewResourceName] = useState("")

  // Datos para autoguardar
  const formData = {
    currentStep,
    contentType,
    title,
    description,
    duration,
    openDate,
    closeDate,
    publishDate,
    resources,
    newResourceName,
  }

  // Usar el hook de autoguardado
  const { isAutosaving, hasAutosavedData, loadAutosavedData, resetAutosavedData } = useAutosave({
    key: AUTOSAVE_KEY,
    data: formData,
  })

  // Cargar datos autoguardados al abrir el modal
  useEffect(() => {
    if (open) {
      const savedData = loadAutosavedData()
      if (savedData) {
        setCurrentStep(savedData.currentStep || 1)
        setContentType(savedData.contentType || "lesson")
        setTitle(savedData.title || "")
        setDescription(savedData.description || "")
        setDuration(savedData.duration || "")
        setOpenDate(savedData.openDate || "")
        setCloseDate(savedData.closeDate || "")
        setPublishDate(savedData.publishDate || "")
        setResources(savedData.resources || [])
        setNewResourceName(savedData.newResourceName || "")
      }
    }
  }, [open])

  // Resetear el estado cuando se cierra el diálogo
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // No reiniciamos los datos al cerrar para mantener el autoguardado
      onOpenChange(open)
    } else {
      onOpenChange(open)
    }
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleAddResource = () => {
    if (!newResourceName.trim()) return

    const fileType = newResourceName.split(".").pop() || "pdf"

    setResources([
      ...resources,
      {
        id: `resource-${uuidv4()}`,
        name: newResourceName,
        type: fileType,
      },
    ])

    setNewResourceName("")
  }

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const handleFinish = () => {
    // Aquí iría la lógica para guardar el nuevo contenido
    console.log({
      moduleId: currentModuleId,
      type: contentType,
      title,
      description,
      duration,
      openDate,
      closeDate,
      publishDate,
      resources,
    })

    // Limpiar datos autoguardados
    resetAutosavedData()

    // Cerrar el diálogo
    handleOpenChange(false)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <div className="p-1 rounded-md bg-rose-100 text-rose-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case "doc":
      case "docx":
        return (
          <div className="p-1 rounded-md bg-blue-100 text-blue-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case "zip":
        return (
          <div className="p-1 rounded-md bg-amber-100 text-amber-600">
            <File className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="p-1 rounded-md bg-gray-100 text-gray-600">
            <File className="h-4 w-4" />
          </div>
        )
    }
  }

  const getContentColor = () => {
    switch (contentType) {
      case "lesson":
        return "blue"
      case "quiz":
        return "amber"
      case "assignment":
        return "emerald"
      case "exam":
        return "rose"
      default:
        return "blue"
    }
  }

  const color = getContentColor()

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="relative">
          <div className="absolute right-0 top-0">
            <AutosaveIndicator
              isAutosaving={isAutosaving}
              hasAutosavedData={hasAutosavedData}
              onReset={resetAutosavedData}
            />
          </div>
          <DialogTitle className={`text-${color}-700`}>Añadir contenido</DialogTitle>
          <DialogDescription>Completa los siguientes pasos para añadir nuevo contenido al módulo</DialogDescription>
        </DialogHeader>

        {/* Indicador de pasos */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 1 ? `bg-${color}-600 text-white` : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? `bg-${color}-600` : "bg-gray-200"}`}></div>
            </div>
            <div className="flex items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 2 ? `bg-${color}-600 text-white` : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? `bg-${color}-600` : "bg-gray-200"}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 3 ? `bg-${color}-600 text-white` : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span className={currentStep >= 1 ? `text-${color}-600 font-medium` : ""}>Tipo</span>
            <span className={currentStep >= 2 ? `text-${color}-600 font-medium` : ""}>Detalles</span>
            <span className={currentStep >= 3 ? `text-${color}-600 font-medium` : ""}>Recursos</span>
          </div>
        </div>

        {/* Paso 1: Selección de tipo de contenido */}
        {currentStep === 1 && (
          <div className="grid gap-4 py-4">
            <RadioGroup value={contentType} onValueChange={setContentType} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="lesson" id="lesson" className="peer sr-only" />
                <Label
                  htmlFor="lesson"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50"
                >
                  <Video className="mb-2 h-6 w-6 text-blue-500" />
                  <div className="font-medium">Lección</div>
                  <div className="text-xs text-muted-foreground">Añadir video o contenido</div>
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
                  <div className="text-xs text-muted-foreground">Añadir preguntas de evaluación</div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="assignment" id="assignment" className="peer sr-only" />
                <Label
                  htmlFor="assignment"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-emerald-500 [&:has([data-state=checked])]:bg-emerald-50"
                >
                  <ClipboardList className="mb-2 h-6 w-6 text-emerald-500" />
                  <div className="font-medium">Tarea</div>
                  <div className="text-xs text-muted-foreground">Añadir tarea práctica</div>
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
                  <div className="text-xs text-muted-foreground">Añadir evaluación final</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Paso 2: Detalles específicos según el tipo */}
        {currentStep === 2 && (
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-title" className={`text-${color}-600`}>
                Título *
              </Label>
              <Input
                id="content-title"
                placeholder={`Ej: ${
                  contentType === "lesson"
                    ? "Introducción a HTML"
                    : contentType === "quiz"
                      ? "Cuestionario de conceptos básicos"
                      : contentType === "assignment"
                        ? "Tarea práctica"
                        : "Examen final"
                }`}
                className={`border-${color}-200 focus-visible:ring-${color}-500`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-description" className={`text-${color}-600`}>
                Descripción
              </Label>
              <Textarea
                id="content-description"
                placeholder="Describe este contenido..."
                className={`border-${color}-200 focus-visible:ring-${color}-500`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-duration" className={`text-${color}-600`}>
                Duración *
              </Label>
              <Input
                id="content-duration"
                placeholder="Ej: 30 min, 2 horas, etc."
                className={`border-${color}-200 focus-visible:ring-${color}-500`}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            {contentType !== "lesson" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="content-open" className={`text-${color}-600`}>
                    Fecha de apertura
                  </Label>
                  <Input
                    id="content-open"
                    type="datetime-local"
                    className={`border-${color}-200 focus-visible:ring-${color}-500`}
                    value={openDate}
                    onChange={(e) => setOpenDate(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content-close" className={`text-${color}-600`}>
                    Fecha de cierre
                  </Label>
                  <Input
                    id="content-close"
                    type="datetime-local"
                    className={`border-${color}-200 focus-visible:ring-${color}-500`}
                    value={closeDate}
                    onChange={(e) => setCloseDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {contentType !== "lesson" && (
              <div className="grid gap-2">
                <Label htmlFor="content-publish" className={`text-${color}-600`}>
                  Fecha de publicación
                </Label>
                <Input
                  id="content-publish"
                  type="datetime-local"
                  className={`border-${color}-200 focus-visible:ring-${color}-500`}
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
            )}

            {contentType === "lesson" && (
              <div className="grid gap-2">
                <Label htmlFor="lesson-video" className={`text-${color}-600`}>
                  Video
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="lesson-video"
                    type="file"
                    accept="video/*"
                    className={`border-${color}-200 focus-visible:ring-${color}-500`}
                  />
                  <Button variant="outline" className={`border-${color}-200 text-${color}-600 hover:bg-${color}-50`}>
                    <Upload className="mr-2 h-4 w-4" />
                    Subir
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Paso 3: Añadir recursos */}
        {currentStep === 3 && (
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="resource-name" className={`text-${color}-600`}>
                Nombre del recurso
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resource-name"
                  placeholder="Ej: Guía de referencia.pdf"
                  className={`border-${color}-200 focus-visible:ring-${color}-500`}
                  value={newResourceName}
                  onChange={(e) => setNewResourceName(e.target.value)}
                />
                <Button
                  variant="outline"
                  className={`border-${color}-200 text-${color}-600 hover:bg-${color}-50`}
                  onClick={handleAddResource}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resource-file" className={`text-${color}-600`}>
                Archivo
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resource-file"
                  type="file"
                  className={`border-${color}-200 focus-visible:ring-${color}-500`}
                />
                <Button variant="outline" className={`border-${color}-200 text-${color}-600 hover:bg-${color}-50`}>
                  <Upload className="mr-2 h-4 w-4" />
                  Subir
                </Button>
              </div>
            </div>

            <div className={`border border-${color}-100 rounded-md p-4 mt-4`}>
              <h4 className="font-medium mb-2">Recursos añadidos</h4>
              {resources.length > 0 ? (
                <div className="space-y-2">
                  {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <span>{resource.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 text-red-600 hover:text-red-800 hover:bg-red-100`}
                        onClick={() => handleRemoveResource(resource.id)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No hay recursos añadidos todavía</p>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
          ) : (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              className={`bg-${color}-600 hover:bg-${color}-700`}
              onClick={handleNext}
              disabled={currentStep === 2 && (!title || !duration)}
            >
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className={`bg-${color}-600 hover:bg-${color}-700`} onClick={handleFinish}>
              Finalizar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
