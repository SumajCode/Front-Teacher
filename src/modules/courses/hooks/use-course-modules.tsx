"use client"

import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Module, Lesson, Resource } from "@/modules/courses/types"
import {
  listarModulos,
  crearModulo,
  editarModulo,
  eliminarModulo,
} from "@/services/moduloService"

export function useCourseModules() {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(false)

  // Simulación de sesión (puedes cambiar por valores reales si tienes login)
  const id_docente = 12
  const id_materia = 3

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    setLoading(true)
    try {
      const response = await listarModulos({
        id_docente,
        id_materia,
      })
      if (response?.status === 200 && Array.isArray(response.data)) {
        setModules(response.data)
      } else {
        console.warn("No se encontraron módulos:", response.message)
      }
    } catch (error) {
      console.error("Error en la API:", error)
    } finally {
      setLoading(false)
    }
  }

  const addModule = async (title: string, description = "", image = "") => {
    const newModule = {
      id_docente,
      id_materia,
      title,
      desciption: description,
      image,
    }

    try {
      const res = await crearModulo(newModule)
      if (res.status === 200) {
        await fetchModules()
      }
    } catch (err) {
      console.error("Error al crear módulo:", err)
    }
  }

  const updateModule = async (id: string, updatedData: Partial<Module>) => {
    try {
      const res = await editarModulo(updatedData, id)
      if (res.status === 200) {
        await fetchModules()
      }
    } catch (err) {
      console.error("Error al editar módulo:", err)
    }
  }

  const deleteModule = async (id: string) => {
    try {
      const res = await eliminarModulo(id)
      if (res.status === 200) {
        await fetchModules()
      }
    } catch (err) {
      console.error("Error al eliminar módulo:", err)
    }
  }

  // ✅ Corregido para aceptar nombre de recurso en lugar de archivo File
  const handleAddResource = (resourceName: string, lesson: Lesson) => {
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
    loading,
    setModules, // ✅ exportado explícitamente para evitar error
    addModule,
    updateModule,
    deleteModule,
    handleAddResource,
    handleDeleteResource,
  }
}
