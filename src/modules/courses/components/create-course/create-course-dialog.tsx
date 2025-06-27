"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { crearMateria } from "@/services/materiaService"
import { docenteMock } from "@/lib/docenteMock"
import { StepIndicator } from "@/modules/courses/components/create-course/steps/step-indicator"
import { Step1Info } from "@/modules/courses/components/create-course/steps/step1-info"

interface CreateCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCourseDialog({
  open,
  onOpenChange,
}: CreateCourseDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  const [title, setTitle] = useState("")
  const [nivelEstudio, setNivelEstudio] = useState("")

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
  }

  const handleNext = () => setCurrentStep(currentStep + 1)
  const handleBack = () => setCurrentStep(currentStep - 1)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await crearMateria({
        nombre_materia: title,
        nivel_estudio: nivelEstudio,
        id_docente: docenteMock.id,
      })

      handleOpenChange(false)
      window.location.reload()
    } catch (error) {
      console.error("Error al crear el curso:", error)
      alert("Hubo un error al crear el curso. Intenta nuevamente.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl">Crear nuevo curso</DialogTitle>
          <DialogDescription>
            Completa los siguientes pasos para crear un nuevo curso
          </DialogDescription>
        </DialogHeader>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <form data-testid="course-form" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <Step1Info
              title={title}
              setTitle={setTitle}
              nivelEstudio={nivelEstudio}
              setNivelEstudio={setNivelEstudio}
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
                type="button"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleNext}
                disabled={!title || !nivelEstudio}
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
