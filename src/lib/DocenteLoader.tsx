// src/lib/DocenteLoader.tsx
"use client"
import { useEffect } from "react"
import { getDocente } from "./docenteMock"

export default function DocenteLoader() {
  console.log("lleuge")
  useEffect(() => {
    const docente = getDocente()
    console.log("DocenteLoader - docente:", docente)
  }, [])
  return null
}
