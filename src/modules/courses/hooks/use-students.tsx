// Añadir hook para gestionar los estudiantes
"use client"

import { useState } from "react"
import type { Student } from "@/modules/courses/types"

// Datos de ejemplo para los estudiantes
const initialStudents: Student[] = [
  {
    id: "student-1",
    name: "Ana García S",
    email: "ana.garcia@ejemplo.com",
    progress: 75,
    lastActive: "Hoy, 10:30 AM",
  },
  {
    id: "student-2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    progress: 45,
    lastActive: "Ayer, 3:15 PM",
  },
  {
    id: "student-3",
    name: "Laura Martínez",
    email: "laura.martínez@ejemplo.com",
    progress: 90,
    lastActive: "Hoy, 9:00 AM",
  },
  {
    id: "student-4",
    name: "Miguel Sánchez",
    email: "miguel.sanchez@ejemplo.com",
    progress: 30,
    lastActive: "Hace 3 días",
  },
  {
    id: "student-5",
    name: "Sofía López",
    email: "sofia.lopez@ejemplo.com",
    progress: 60,
    lastActive: "Hoy, 2:45 PM",
  },
]

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents)

  // Función para añadir un estudiante
  const addStudent = (student: Student) => {
    setStudents([...students, student])
  }

  // Función para eliminar un estudiante
  const removeStudent = (studentId: string) => {
    setStudents(students.filter((student) => student.id !== studentId))
  }

  return {
    students,
    setStudents,
    addStudent,
    removeStudent,
  }
}
