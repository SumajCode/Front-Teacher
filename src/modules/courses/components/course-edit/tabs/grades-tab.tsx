import { GraduationCap } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Module, StudentGrade } from "@/modules/courses/types"

interface GradesTabProps {
  modules: Module[]
  studentGrades: StudentGrade[]
  averageGrade: number
}

export function GradesTab({ modules, studentGrades }: GradesTabProps) {
  return (
    <Card className="border-green-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-green-600" />
          Notas del curso
        </CardTitle>
        <CardDescription>
          Calificaciones de los estudiantes en todas las evaluaciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                <th className="p-3 bg-green-50">Estudiante</th>
                {modules
                  .flatMap((module) =>
                    module.contenido.filter(
                      (item) =>
                        item.type === "quiz" ||
                        item.type === "assignment" ||
                        item.type === "exam"
                    )
                  )
                  .map((evaluation) => (
                    <th key={evaluation._id} className="p-3 bg-green-50">
                      <div className="flex flex-col">
                        <span className="font-medium">{evaluation.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {evaluation.type === "quiz"
                            ? "Cuestionario"
                            : evaluation.type === "assignment"
                              ? "Tarea"
                              : "Examen"}
                        </span>
                      </div>
                    </th>
                  ))}
                <th className="p-3 bg-green-50">
                  <div className="flex flex-col">
                    <span className="font-medium">Promedio</span>
                    <span className="text-xs text-muted-foreground">Final</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((student) => {
                // Calcular el promedio del estudiante
                const studentAverage =
                  student.grades.length > 0
                    ? Math.round(
                        student.grades.reduce(
                          (sum, grade) => sum + grade.grade,
                          0
                        ) / student.grades.length
                      )
                    : 0

                return (
                  <tr
                    key={student.studentId}
                    className="border-b hover:bg-green-50/50"
                  >
                    <td className="p-3 font-medium">{student.name}</td>
                    {modules
                      .flatMap((module) =>
                        module.contenido.filter(
                          (item) =>
                            item.type === "quiz" ||
                            item.type === "assignment" ||
                            item.type === "exam"
                        )
                      )
                      .map((evaluation) => {
                        const studentGrade = student.grades.find(
                          (grade) => grade.evaluationId === evaluation._id
                        )
                        const grade = studentGrade ? studentGrade.grade : "-"
                        const gradeColor =
                          grade !== "-"
                            ? grade >= 80
                              ? "text-green-600 bg-green-50"
                              : grade >= 60
                                ? "text-amber-600 bg-amber-50"
                                : "text-red-600 bg-red-50"
                            : ""

                        return (
                          <td
                            key={`${student.studentId}-${evaluation._id}`}
                            className="p-3"
                          >
                            <span
                              className={`inline-block w-12 text-center py-1 px-2 rounded-md font-medium ${gradeColor}`}
                            >
                              {grade !== "-" ? `${grade}%` : "-"}
                            </span>
                          </td>
                        )
                      })}
                    <td className="p-3">
                      <span
                        className={`inline-block w-12 text-center py-1 px-2 rounded-md font-medium ${
                          studentAverage >= 80
                            ? "text-green-600 bg-green-50"
                            : studentAverage >= 60
                              ? "text-amber-600 bg-amber-50"
                              : "text-red-600 bg-red-50"
                        }`}
                      >
                        {studentAverage}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
