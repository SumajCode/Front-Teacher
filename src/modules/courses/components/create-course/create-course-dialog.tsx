"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAutosave } from "@/modules/courses/hooks/use-autosave"
import { AutosaveIndicator } from "@/modules/courses/components/ui/autosave-indicator"
import { StepIndicator } from "@/modules/courses/components/create-course/steps/step-indicator"
import { Step1Info } from "@/modules/courses/components/create-course/steps/step1-info"

import { Step2Image } from "@/modules/courses/components/create-course/steps/step2-image"

interface CreateCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Clave para almacenar los datos en localStorage
const AUTOSAVE_KEY = "course_creation_autosave"

export function CreateCourseDialog({
  open,
  onOpenChange,
}: CreateCourseDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  // Paso 1: Información básica
  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  // Paso 2: Imagen
  //descomentar cuando se use la api para mandar el file
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Datos para autoguardar
  const formData = {
    currentStep,
    title,
    description,
    imagePreview,
  }

  // Usar el hook de autoguardado
  const {
    isAutosaving,
    hasAutosavedData,
    loadAutosavedData,
    resetAutosavedData,
  } = useAutosave({
    key: AUTOSAVE_KEY,
    data: formData,
  })

  // Cargar datos autoguardados al abrir el modal
  useEffect(() => {
    if (open) {
      const savedData = loadAutosavedData()
      if (savedData) {
        // Cargar los datos guardados
        setCurrentStep(savedData.currentStep || 1)
        setTitle(savedData.title || "")
        setDescription(savedData.description || "")
        setImagePreview(savedData.imagePreview || null)
      }
    }
  }, [open])

  // Resetear el estado cuando se cierra el diálogo
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // No reiniciamos los datos al cerrar para mantener el autoguardado
      // Solo actualizamos el estado de apertura
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Crear un nuevo curso con los datos ingresados
    const newCourse = {
      id: `course-${Date.now()}`,
      title,
      description,
      image:
        imagePreview ||
        "/placeholder.svg?height=150&width=250&text=Curso+Nuevo",
      status: "draft",
      students: 0,
      rating: 0,
      revenue: "$0",
      lastUpdated: new Date().toISOString().split("T")[0],
      modules: 0,
      lessons: 0,
      duration: "0h 0m",
      color: "blue",
    }

    console.log("Nuevo curso creado:", newCourse)

    // En una aplicación real, aquí enviaríamos los datos al servidor
    // y actualizaríamos el estado global de cursos

    // Eliminar datos autoguardados al completar exitosamente
    resetAutosavedData()

    // Cerrar el diálogo
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <div className="absolute right-0 top-0">
            <AutosaveIndicator
              isAutosaving={isAutosaving}
              hasAutosavedData={hasAutosavedData}
              onReset={resetAutosavedData}
            />
          </div>
          <DialogTitle className="text-xl">Crear nuevo curso</DialogTitle>
          <DialogDescription>
            Completa los siguientes pasos para crear un nuevo curso
          </DialogDescription>
        </DialogHeader>

        {/* Indicador de pasos */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <form data-testid="course-form" onSubmit={handleSubmit}>
          {/* Paso 1: Información básica */}
          {currentStep === 1 && (
            <Step1Info
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
          )}

          {/* Paso 2: Imagen */}
          {currentStep === 2 && (
            <Step2Image
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              setImageFile={setImageFile}
            />
          )}

          <DialogFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handleBack} type="button">
                Atrás
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                type="button"
              >
                Cancelar
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleNext}
                disabled={currentStep === 1 && (!title || !description)}
                type="button"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                type="submit"
              >
                Crear curso
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
