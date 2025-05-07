import { BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { Course } from '@/modules/courses/types'

interface CourseStatsProps {
  courses: Course[]
}

export function CourseStats({ courses }: CourseStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de cursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{courses.length}</div>
          <p className="text-xs text-muted-foreground">
            {courses.filter((c) => c.status === 'published').length} publicados,{' '}
            {courses.filter((c) => c.status === 'draft').length} borradores,{' '}
            {courses.filter((c) => c.status === 'archived').length} archivados
          </p>
          <div className="mt-2 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${(courses.filter((c) => c.status === 'published').length / courses.length) * 100}%`,
              }}
            ></div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {courses.reduce((sum, course) => sum + course.students, 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            +{courses.reduce((sum, course) => sum + Math.floor(course.students * 0.1), 0)} este mes
          </p>
          <Progress value={75} className="h-1 mt-2" />
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de módulos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {courses.reduce((sum, course) => sum + course.modules, 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round(courses.reduce((sum, course) => sum + course.modules, 0) / courses.length)}{' '}
            módulos por curso en promedio
          </p>
          <div className="mt-2 flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <div className="h-1 w-full bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
