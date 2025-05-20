"use client"

import { useState, useEffect, useRef } from "react"

interface AutosaveOptions {
  key: string
  data: any
  onSave?: () => void
  expiryTime?: number
}

export function useAutosave({ key, data, onSave, expiryTime = 60 * 60 * 1000 }: AutosaveOptions) {
  const [isAutosaving, setIsAutosaving] = useState(false)
  const [hasAutosavedData, setHasAutosavedData] = useState(false)
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastChangeRef = useRef<number>(Date.now())

  // Función para guardar datos automáticamente
  const autosaveData = () => {
    setIsAutosaving(true)

    const dataToSave = {
      ...data,
      timestamp: Date.now(),
    }

    localStorage.setItem(key, JSON.stringify(dataToSave))
    setHasAutosavedData(true)

    if (onSave) {
      onSave()
    }

    // Mostrar el indicador de autoguardado durante 1.5 segundos
    setTimeout(() => {
      setIsAutosaving(false)
    }, 1500)
  }

  // Función para cargar datos autoguardados
  const loadAutosavedData = () => {
    const savedData = localStorage.getItem(key)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        const { timestamp } = parsedData

        // Verificar si los datos han expirado
        const now = Date.now()
        if (now - timestamp > expiryTime) {
          // Los datos han expirado, eliminarlos
          localStorage.removeItem(key)
          setHasAutosavedData(false)
          return null
        }

        setHasAutosavedData(true)
        return parsedData
      } catch (error) {
        console.error("Error al cargar datos autoguardados:", error)
        return null
      }
    }
    return null
  }

  // Función para reiniciar los datos
  const resetAutosavedData = () => {
    localStorage.removeItem(key)
    setHasAutosavedData(false)
  }

  // Configurar el autoguardado cuando cambian los datos
  useEffect(() => {
    lastChangeRef.current = Date.now()

    // Cancelar el timeout anterior si existe
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current)
    }

    // Configurar un nuevo timeout para autoguardar
    autosaveTimeoutRef.current = setTimeout(() => {
      autosaveData()
    }, 1000) // Autoguardar después de 1 segundo de inactividad

    return () => {
      // Limpiar el timeout al desmontar
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current)
      }
    }
  }, [data])

  // Verificar si los datos autoguardados han expirado
  useEffect(() => {
    const checkExpiredData = () => {
      const savedData = localStorage.getItem(key)
      if (savedData) {
        try {
          const { timestamp } = JSON.parse(savedData)
          const now = Date.now()
          if (now - timestamp > expiryTime) {
            // Los datos han expirado, eliminarlos
            localStorage.removeItem(key)
            setHasAutosavedData(false)
          }
        } catch (error) {
          console.error("Error al verificar datos expirados:", error)
        }
      }
    }

    // Verificar al montar el componente
    checkExpiredData()

    // Configurar un intervalo para verificar periódicamente
    const interval = setInterval(checkExpiredData, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [key, expiryTime])

  return {
    isAutosaving,
    hasAutosavedData,
    loadAutosavedData,
    resetAutosavedData,
  }
}
