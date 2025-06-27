"use client"

import { useEffect, useState } from "react"
import { Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Student {
  nombre_estudiante: string
  apellido_estudiante: string
  correo_estudiante: string
}

interface StudentsTabProps {
  courseId: string
  onAddStudent: () => void
  onViewStudentDetails: (student: Student) => void
  key?: string
  refreshTrigger: number // nuevo: para forzar recarga
}

export function StudentsTab({ courseId, onAddStudent, onViewStudentDetails, refreshTrigger }: StudentsTabProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `https://microservice-docente.onrender.com/apidocentes/v1/matricula/listar/materia?id_materia=${courseId}`
        )
        const data = await res.json()
        setStudents(data.data || [])
      } catch (error) {
        console.error("Error al obtener estudiantes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [courseId, refreshTrigger]) // refreshTrigger activará useEffect

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Estudiantes del curso
        </CardTitle>
        <CardDescription>Gestiona los estudiantes inscritos en este curso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar estudiantes..." className="w-[250px]" />
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              Filtrar
            </Button>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={onAddStudent}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir estudiante
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando estudiantes...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3">Nombre</th>
                  <th className="pb-3">Apellido</th>
                  <th className="pb-3">Correo</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => onViewStudentDetails(student)}
                  >
                    <td className="py-3">{student.nombre_estudiante}</td>
                    <td className="py-3">{student.apellido_estudiante}</td>
                    <td className="py-3">{student.correo_estudiante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
