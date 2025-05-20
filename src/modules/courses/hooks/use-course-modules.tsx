// Añadir hook para gestionar los módulos del curso
"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Module, Lesson, Resource } from "@/modules/courses/types"

// Datos de ejemplo para los módulos
const initialModules: Module[] = [
  {
    id: "module-1",
    title: "Introducción al Desarrollo Web",
    lessons: [
      {
        id: "lesson-1",
        title: "Bienvenida al curso",
        type: "video",
        duration: "10 min",
        resources: [
          {
            id: "resource-1",
            name: "Guía de inicio.pdf",
            type: "pdf",
          },
          {
            id: "resource-2",
            name: "Recursos adicionales.zip",
            type: "zip",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "Cuestionario inicial",
        type: "quiz",
        duration: "15 min",
        openDate: "2023-12-01T08:00",
        closeDate: "2023-12-31T23:59",
        publishDate: "2023-12-01T08:00",
        grade: 85,
        resources: [],
      },
    ],
  },
  {
    id: "module-2",
    title: "HTML y CSS Básico",
    lessons: [
      {
        id: "lesson-3",
        title: "Estructura básica HTML",
        type: "video",
        duration: "25 min",
        resources: [
          {
            id: "resource-3",
            name: "Ejemplos de código.zip",
            type: "zip",
          },
        ],
      },
      {
        id: "lesson-4",
        title: "Tarea: Crear una página simple",
        type: "assignment",
        duration: "2 horas",
        openDate: "2023-12-05T08:00",
        closeDate: "2023-12-15T23:59",
        publishDate: "2023-12-05T08:00",
        grade: 78,
        resources: [
          {
            id: "resource-4",
            name: "Instrucciones.pdf",
            type: "pdf",
          },
        ],
      },
    ],
  },
  {
    id: "module-3",
    title: "JavaScript Fundamentos",
    lessons: [
      {
        id: "lesson-5",
        title: "Introducción a JavaScript",
        type: "video",
        duration: "30 min",
        resources: [],
      },
      {
        id: "lesson-6",
        title: "Examen de JavaScript",
        type: "exam",
        duration: "1 hora",
        openDate: "2023-12-20T10:00",
        closeDate: "2023-12-20T11:00",
        publishDate: "2023-12-15T08:00",
        resources: [],
      },
    ],
  },
]

export function useCourseModules() {
  const [modules, setModules] = useState<Module[]>(initialModules)

  // Función para añadir un recurso a una lección
  const handleAddResource = (resourceName: string, lesson: Lesson) => {
    if (!resourceName.trim()) return

    const fileType = resourceName.split(".").pop() || "pdf"

    const newResource: Resource = {
      id: `resource-${uuidv4()}`,
      name: resourceName,
      type: fileType,
    }

    const updatedModules = modules.map((module) => {
      const updatedLessons = module.lessons.map((l) => {
        if (l.id === lesson.id) {
          return {
            ...l,
            resources: [...l.resources, newResource],
          }
        }
        return l
      })

      return {
        ...module,
        lessons: updatedLessons,
      }
    })

    setModules(updatedModules)
  }

  // Función para eliminar un recurso
  const handleDeleteResource = (resourceId: string, lessonId: string) => {
    const updatedModules = modules.map((module) => {
      const updatedLessons = module.lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          return {
            ...lesson,
            resources: lesson.resources.filter(
              (resource) => resource.id !== resourceId
            ),
          }
        }
        return lesson
      })

      return {
        ...module,
        lessons: updatedLessons,
      }
    })

    setModules(updatedModules)
  }

  return {
    modules,
    setModules,
    handleAddResource,
    handleDeleteResource,
  }
}
