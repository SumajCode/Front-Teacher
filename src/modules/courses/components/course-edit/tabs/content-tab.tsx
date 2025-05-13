"use client"

import { BookOpen, Edit, Grip, Plus, PlusCircle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { getLessonIcon } from "@/modules/courses/utils/course-helpers"
import type { Module, Lesson } from "@/modules/courses/types"

interface ContentTabProps {
  modules: Module[]
  onAddModule: () => void
  onAddContent: (moduleId: string) => void
  onEditLesson: (lesson: Lesson) => void
  onEditAssignment: (lesson: Lesson) => void
  onEditModule: (module: Module) => void
  onDeleteModule: (moduleId: string) => void
}

export function ContentTab({
  modules,
  onAddModule,
  onAddContent,
  onEditLesson,
  onEditAssignment,
  onEditModule,
  onDeleteModule,
}: ContentTabProps) {
  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Estructura del curso
        </CardTitle>
        <CardDescription>Organiza los módulos, lecciones, tareas y exámenes de tu curso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddModule}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir módulo
            </Button>
          </div>

          <Accordion type="multiple" defaultValue={["1"]}>
            {modules.map((module) => (
              <AccordionItem key={module.id} value={module.id} className="border border-blue-100 rounded-md mb-4">
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
                      onClick={() => onDeleteModule(module.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Eliminar módulo</span>
                    </Button>
                  </div>
                </div>
                <AccordionContent className="bg-white">
                  <div className="space-y-2 pl-6 pt-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <Grip className="h-4 w-4 text-gray-400" />
                          {getLessonIcon(lesson.type)}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{lesson.title}</span>
                              <Badge
                                variant={
                                  lesson.type === "video"
                                    ? "default"
                                    : lesson.type === "quiz"
                                      ? "secondary"
                                      : lesson.type === "assignment"
                                        ? "outline"
                                        : "destructive"
                                }
                              >
                                {lesson.type === "video"
                                  ? "Video"
                                  : lesson.type === "quiz"
                                    ? "Cuestionario"
                                    : lesson.type === "assignment"
                                      ? "Tarea"
                                      : "Examen"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">{lesson.duration}</span>
                              {lesson.resources.length > 0 && (
                                <span className="flex items-center gap-1">{lesson.resources.length} recursos</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            onClick={() => (lesson.type === "video" ? onEditLesson(lesson) : onEditAssignment(lesson))}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar lección</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Eliminar lección</span>
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}
