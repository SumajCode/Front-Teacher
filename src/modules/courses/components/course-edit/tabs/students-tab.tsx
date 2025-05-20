"use client"

import { Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Student } from "@/modules/courses/types"

interface StudentsTabProps {
  students: Student[]
  onAddStudent: () => void
  onViewStudentDetails: (student: Student) => void
}

export function StudentsTab({ students, onAddStudent, onViewStudentDetails }: StudentsTabProps) {
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                <th className="pb-3">Estudiante</th>
                <th className="pb-3">Progreso</th>
                <th className="pb-3">Última actividad</th>
                <th className="pb-3">Tareas completadas</th>
                <th className="pb-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(0)}`} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span>{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3">{student.lastActive}</td>
                  <td className="py-3">3/5</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        onClick={() => onViewStudentDetails(student)}
                      >
                        Ver detalles
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        Mensaje
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
