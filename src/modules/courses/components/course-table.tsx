import Link from 'next/link'
import { Calendar, Users, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getStatusBadge, getColorClass } from '@/modules/courses/utils/course-helpers'
import type { Course } from '@/modules/courses/types'

interface CourseTableProps {
  courses: Course[]
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left text-sm font-medium text-muted-foreground">
              <th className="p-4">Título</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Estudiantes</th>
              <th className="p-4">Módulos</th>
              <th className="p-4">Última actualización</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition-colors`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage
                        src={course.image || '/placeholder.svg'}
                        alt={course.title}
                        className="object-cover"
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-r ${getColorClass(course.color)} text-white rounded-md`}
                      >
                        {course.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="font-medium hover:text-blue-600 hover:underline"
                      >
                        {course.title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{getStatusBadge(course.status)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{course.students}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                    <span>{course.modules}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(course.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
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
