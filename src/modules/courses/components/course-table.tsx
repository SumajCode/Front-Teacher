import Link from "next/link"
import { Calendar, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getStatusBadge, getColorClass } from "@/modules/courses/utils/course-helpers"
import type { Course } from "@/modules/courses/types"

interface CourseTableProps {
  courses: Course[]
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="rounded-xl border border-blue-100 dark:border-blue-900 overflow-hidden shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-left text-sm font-medium">
              <th className="p-4 text-blue-700 dark:text-blue-300">Título</th>
              <th className="p-4 text-blue-700 dark:text-blue-300">Estado</th>
              <th className="p-4 text-blue-700 dark:text-blue-300">Estudiantes</th>
              <th className="p-4 text-blue-700 dark:text-blue-300">Módulos</th>
              <th className="p-4 text-blue-700 dark:text-blue-300">Última actualización</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-blue-50/30 dark:bg-blue-950/30"
                } hover:bg-blue-100/50 dark:hover:bg-blue-900/50 transition-colors`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-lg shadow-sm">
                      <AvatarImage
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover"
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-r ${getColorClass(course.color)} text-white rounded-lg`}
                      >
                        {course.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 hover:underline transition-colors"
                      >
                        {course.title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{getStatusBadge(course.status)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">{course.students}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-100 dark:bg-emerald-900 p-1.5 rounded-full">
                      <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-medium">{course.modules}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 dark:bg-purple-900 p-1.5 rounded-full">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>{new Date(course.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm"
                  >
                    <Link href={`/courses/${course.id}`}>Editar</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
