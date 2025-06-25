"use client"

import { useState } from "react"
import { BookOpen, Edit, Grip, Plus, PlusCircle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { getLessonIcon } from "@/modules/courses/utils/course-helpers"
import type { Module, Lesson } from "@/modules/courses/types"
import { useEffect } from "react"
import { docenteMock } from "@/lib/docenteMock"

interface ContentTabProps {
  courseId: string
  modules: Module[]
  onAddModule: () => void
  onAddContent: (moduleId: string) => void
  onEditLesson: (lesson: Lesson) => void
  onEditAssignment: (lesson: Lesson) => void
  onEditModule: (module: Module) => void
  onDeleteModule: (moduleId: any) => void
  onDeleteContent: (lesson: Lesson) => void
}

export function ContentTab({
  modules,
  courseId,
  onAddModule,
  onAddContent,
  onEditLesson,
  onEditAssignment,
  onEditModule,
  onDeleteModule,
  onDeleteContent,
}: ContentTabProps) {
  const [datosFiltrados, setDatosFiltrados] = useState<Module[]>([])
  const id = parseInt(courseId)
  useEffect(() => {
    const filtered = modules.filter(
      (mod: any) => mod.id_docente === docenteMock.id && mod.id_materia === id
    )
    // console.log({  docenteMock.id })
    // console.log("idddddddddddddd" + docenteMock.id)

    setDatosFiltrados(filtered)
    console.log("Filtrados" + filtered)
  }, [modules])
  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Estructura del curso
        </CardTitle>
        <CardDescription>
          Organiza los módulos, lecciones, tareas y exámenes de tu curso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onAddModule}
            >
              <Plus className="mr-2 h-4 w-4" />
              Añadir módulo
            </Button>
          </div>
          {/* <pre className="text-xs text-gray-500 bg-gray-100 rounded p-2 overflow-x-auto">
            {JSON.stringify(datosFiltrados, null, 2)}
          </pre> */}
          <Accordion type="multiple" defaultValue={["1"]}>
            {datosFiltrados.map((module) => (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="border border-blue-100 rounded-md mb-4"
              >
                <div className="flex items-center bg-blue-50 rounded-t-md">
                  <Grip className="ml-2 h-4 w-4 text-blue-400" />
                  <AccordionTrigger className="flex-1 hover:bg-blue-100 rounded-t-md px-4">
                    <span className="font-medium">{module.title}</span>
                  </AccordionTrigger>
                  <div className="flex items-center gap-2 pr-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                      onClick={() => onEditModule(module)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar módulo</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-800 hover:bg-red-100"
                      onClick={() => onDeleteModule(module)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Eliminar módulo</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pl-6 pt-2">
                  {module.contenido?.map((archivo: any) => (
                    <div
                      key={archivo._id + "-wrapper"}
                      className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Grip className="h-4 w-4 text-gray-400" />
                        {getLessonIcon(archivo.type)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{archivo.title}</span>
                            <Badge
                              variant={
                                archivo.type === "video"
                                  ? "default"
                                  : archivo.type === "quiz"
                                    ? "secondary"
                                    : archivo.type === "assignment"
                                      ? "outline"
                                      : archivo.type === "evaluacion"
                                        ? "destructive"
                                        : "default"
                              }
                            >
                              {archivo.type === "video"
                                ? "Video"
                                : archivo.type === "quiz"
                                  ? "Cuestionario"
                                  : archivo.type === "assignment"
                                    ? "Tarea"
                                    : archivo.type === "evaluacion"
                                      ? "Evaluación"
                                      : archivo.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              {archivo.duration || archivo.time_deliver || ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          onClick={() =>
                            archivo.type === "video"
                              ? onEditLesson(archivo)
                              : onEditAssignment(archivo)
                          }
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar archivo</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={() => onDeleteModule(module.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Eliminar archivo</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => onAddContent(module.id)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Añadir contenido
                  </Button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}
