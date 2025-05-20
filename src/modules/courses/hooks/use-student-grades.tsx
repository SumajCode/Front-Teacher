// Añadir hook para gestionar las calificaciones de los estudiantes
"use client"

import { useState } from "react"
import type { StudentGrade } from "@/modules/courses/types"

// Datos de ejemplo para las calificaciones
const initialStudentGrades: StudentGrade[] = [
  {
    studentId: "student-1",
    name: "Ana García Solano",
    grades: [
      { evaluationId: "lesson-2", grade: 85 },
      { evaluationId: "lesson-4", grade: 78 },
      { evaluationId: "lesson-6", grade: 0 },
    ],
  },
  {
    studentId: "student-2",
    name: "Carlos Rodríguez",
    grades: [
      { evaluationId: "lesson-2", grade: 70 },
      { evaluationId: "lesson-4", grade: 65 },
      { evaluationId: "lesson-6", grade: 0 },
    ],
  },
  {
    studentId: "student-3",
    name: "Laura Martínez",
    grades: [
      { evaluationId: "lesson-2", grade: 95 },
      { evaluationId: "lesson-4", grade: 90 },
      { evaluationId: "lesson-6", grade: 0 },
    ],
  },
  {
    studentId: "student-4",
    name: "Miguel Sánchez",
    grades: [
      { evaluationId: "lesson-2", grade: 60 },
      { evaluationId: "lesson-4", grade: 55 },
      { evaluationId: "lesson-6", grade: 0 },
    ],
  },
  {
    studentId: "student-5",
    name: "Sofía López",
    grades: [
      { evaluationId: "lesson-2", grade: 80 },
      { evaluationId: "lesson-4", grade: 75 },
      { evaluationId: "lesson-6", grade: 0 },
    ],
  },
]

export function useStudentGrades() {
  const [studentGrades, setStudentGrades] =
    useState<StudentGrade[]>(initialStudentGrades)

  // Función para actualizar la calificación de un estudiante
  const updateGrade = (
    studentId: string,
    evaluationId: string,
    grade: number
  ) => {
    setStudentGrades(
      studentGrades.map((student) => {
        if (student.studentId === studentId) {
          const updatedGrades = student.grades.map((g) => {
            if (g.evaluationId === evaluationId) {
              return { ...g, grade }
            }
            return g
          })

          // Si no existe la evaluación, la añadimos
          if (!student.grades.some((g) => g.evaluationId === evaluationId)) {
            updatedGrades.push({ evaluationId, grade })
          }

          return {
            ...student,
            grades: updatedGrades,
          }
        }
        return student
      })
    )
  }

  return {
    studentGrades,
    setStudentGrades,
    updateGrade,
  }
}
