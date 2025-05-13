import Link from "next/link"
import Image from "next/image"
import { BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getStatusBadge } from "@/modules/courses/utils/course-helpers"
import type { Course } from "@/modules/courses/types"

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 border-t-purple-800 group"
        >
          <div className="relative">
            <Image
              width={250}
              height={150}
              src={course.image || "/default.png"}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-2 right-2">
              {getStatusBadge(course.status)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="font-bold text-lg truncate">{course.title}</h3>
            </div>
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-3">
              {course.description}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4 text-blue-500" />
                <span>{course.students} estudiantes</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>{course.modules} módulos</span>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href={`/courses/${course.id}`}>Ver</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
