"use client"

import { useEffect, useState } from "react"
import type { Module } from "@/modules/courses/types"
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
      const response = await listarModulos() // No recibe argumentos

      if (response?.status === 200 && Array.isArray(response.data)) {
        const parsedModules = response.data.map((mod: Record<string, unknown>) => ({
          ...mod,
          id: (mod as { _id?: string })._id,
        }))
        setModules(parsedModules as Module[])
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

  return {
    modules,
    loading,
    setModules,
    addModule,
    updateModule,
    deleteModule,
  }
}
