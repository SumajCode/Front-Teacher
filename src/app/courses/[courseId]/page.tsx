"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  FileCheck,
  Grip,
  Plus,
  Trash,
  Upload,
  Users,
  File,
  FileText,
  BookOpen,
  Settings,
  PlusCircle,
  Video,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CourseEditPage({
  params,
}: {
  params: { courseId: string }
}) {
  const [modules, setModules] = useState([
    {
      id: "1",
      title: "Introducción al curso",
      lessons: [
        {
          id: "1",
          title: "Bienvenida al curso",
          duration: "5:20",
          type: "video",
          resources: [
            { id: "r1", name: "Presentación.pdf", type: "pdf" },
            { id: "r2", name: "Guía de inicio.docx", type: "doc" },
          ],
        },
        {
          id: "2",
          title: "¿Qué aprenderás?",
          duration: "8:45",
          type: "video",
          resources: [],
        },
        {
          id: "3",
          title: "Configuración del entorno",
          duration: "12:30",
          type: "video",
          resources: [
            { id: "r3", name: "Instrucciones de instalación.pdf", type: "pdf" },
          ],
        },
        {
          id: "4",
          title: "Cuestionario inicial",
          duration: "30 min",
          type: "quiz",
          openDate: "2023-05-15T10:00",
          closeDate: "2023-06-15T23:59",
          publishDate: "2023-05-15T10:00",
          resources: [],
          grade: 85,
        },
      ],
    },
    {
      id: "2",
      title: "Fundamentos básicos",
      lessons: [
        {
          id: "5",
          title: "Conceptos clave",
          duration: "15:10",
          type: "video",
          resources: [],
        },
        {
          id: "6",
          title: "Primeros pasos",
          duration: "18:22",
          type: "video",
          resources: [],
        },
        {
          id: "7",
          title: "Tarea práctica: Implementación básica",
          duration: "2 horas",
          type: "assignment",
          openDate: "2023-05-20T10:00",
          closeDate: "2023-05-27T23:59",
          publishDate: "2023-05-20T10:00",
          resources: [
            { id: "r4", name: "Instrucciones de la tarea.pdf", type: "pdf" },
            { id: "r5", name: "Plantilla de proyecto.zip", type: "zip" },
          ],
          grade: 78,
        },
      ],
    },
    {
      id: "3",
      title: "Proyectos prácticos",
      lessons: [
        {
          id: "8",
          title: "Proyecto 1: Introducción",
          duration: "7:15",
          type: "video",
          resources: [],
        },
        {
          id: "9",
          title: "Proyecto 1: Desarrollo",
          duration: "22:40",
          type: "video",
          resources: [],
        },
        {
          id: "10",
          title: "Proyecto 1: Finalización",
          duration: "14:55",
          type: "video",
          resources: [],
        },
        {
          id: "11",
          title: "Examen final del módulo",
          duration: "1 hora",
          type: "exam",
          openDate: "2023-06-01T10:00",
          closeDate: "2023-06-01T23:59",
          publishDate: "2023-05-30T10:00",
          resources: [],
          grade: 92,
        },
      ],
    },
  ])

  const [editingLesson, setEditingLesson] = useState<any>(null)
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false)
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<any>(null)
  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false)
  const [contentType, setContentType] = useState<string>("lesson")
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [isStudentDetailsDialogOpen, setIsStudentDetailsDialogOpen] =
    useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [lessonEditTab, setLessonEditTab] = useState("details")
  const [assignmentEditTab, setAssignmentEditTab] = useState("details")
  const [newResourceName, setNewResourceName] = useState("")

  const students = [
    {
      id: "1",
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      progress: 75,
      lastActive: "Hoy",
    },
    {
      id: "2",
      name: "María López",
      email: "maria@example.com",
      progress: 45,
      lastActive: "Ayer",
    },
    {
      id: "3",
      name: "Juan Pérez",
      email: "juan@example.com",
      progress: 90,
      lastActive: "Hace 3 días",
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@example.com",
      progress: 30,
      lastActive: "Hace 1 semana",
    },
    {
      id: "5",
      name: "Roberto Sánchez",
      email: "roberto@example.com",
      progress: 60,
      lastActive: "Hoy",
    },
  ]

  // Primero, vamos a añadir un estado para las calificaciones de los estudiantes
  // Añadir esto junto a los otros estados al inicio del componente:

  const [studentGrades, setStudentGrades] = useState([
    {
      studentId: "1",
      name: "Carlos Rodríguez",
      grades: [
        { evaluationId: "4", grade: 85 },
        { evaluationId: "7", grade: 78 },
        { evaluationId: "11", grade: 92 },
      ],
    },
    {
      studentId: "2",
      name: "María López",
      grades: [
        { evaluationId: "4", grade: 92 },
        { evaluationId: "7", grade: 85 },
        { evaluationId: "11", grade: 88 },
      ],
    },
    {
      studentId: "3",
      name: "Juan Pérez",
      grades: [
        { evaluationId: "4", grade: 78 },
        { evaluationId: "7", grade: 90 },
        { evaluationId: "11", grade: 95 },
      ],
    },
    {
      studentId: "4",
      name: "Ana Martínez",
      grades: [
        { evaluationId: "4", grade: 65 },
        { evaluationId: "7", grade: 72 },
        { evaluationId: "11", grade: 80 },
      ],
    },
    {
      studentId: "5",
      name: "Roberto Sánchez",
      grades: [
        { evaluationId: "4", grade: 88 },
        { evaluationId: "7", grade: 75 },
        { evaluationId: "11", grade: 82 },
      ],
    },
  ])

  // Calcular el promedio de calificaciones
  const allGrades = modules
    .flatMap((module) =>
      module.lessons.filter(
        (lesson) =>
          lesson.type === "quiz" ||
          lesson.type === "assignment" ||
          lesson.type === "exam"
      )
    )
    .map((lesson) => lesson.grade || 0)

  const averageGrade =
    allGrades.length > 0
      ? Math.round(
          allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length
        )
      : 0

  const handleEditLesson = (lesson: any) => {
    setEditingLesson(lesson)
    setLessonEditTab("details")
    setIsLessonDialogOpen(true)
  }

  const handleEditAssignment = (lesson: any) => {
    setEditingAssignment(lesson)
    setAssignmentEditTab("details")
    setIsAssignmentDialogOpen(true)
  }

  const handleAddContent = (moduleId: string) => {
    setCurrentModuleId(moduleId)
    setIsAddContentDialogOpen(true)
  }

  const handleAddModule = () => {
    setIsAddModuleDialogOpen(true)
  }

  const handleViewStudentDetails = (student: any) => {
    setSelectedStudent(student)
    setIsStudentDetailsDialogOpen(true)
  }

  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null)

  const handleAddResource = (resourceName: string, lesson: any) => {
    if (!resourceName.trim()) return

    const newResource = {
      id: `r${Date.now()}`,
      name: resourceName,
      type: resourceName.split(".").pop() || "pdf",
    }

    // Actualizar el estado de los módulos para añadir el nuevo recurso
    const updatedModules = modules.map((module) => {
      return {
        ...module,
        lessons: module.lessons.map((l) => {
          if (l.id === lesson.id) {
            return {
              ...l,
              resources: [...l.resources, newResource],
            }
          }
          return l
        }),
      }
    })

    setModules(updatedModules)
    setNewResourceName("")
  }

  const handleDeleteResource = (resourceId: string, lessonId: string) => {
    // Actualizar el estado de los módulos para eliminar el recurso
    const updatedModules = modules.map((module) => {
      return {
        ...module,
        lessons: module.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return {
              ...lesson,
              resources: lesson.resources.filter(
                (resource) => resource.id !== resourceId
              ),
            }
          }
          return lesson
        }),
      }
    })

    setModules(updatedModules)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <div className="p-1 rounded-md bg-rose-100 text-rose-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case "doc":
      case "docx":
        return (
          <div className="p-1 rounded-md bg-blue-100 text-blue-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case "zip":
        return (
          <div className="p-1 rounded-md bg-amber-100 text-amber-600">
            <File className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="p-1 rounded-md bg-gray-100 text-gray-600">
            <File className="h-4 w-4" />
          </div>
        )
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return (
          <div className="p-1 rounded-md bg-blue-100 text-blue-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case "quiz":
        return (
          <div className="p-1 rounded-md bg-amber-100 text-amber-600">
            <FileCheck className="h-4 w-4" />
          </div>
        )
      case "assignment":
        return (
          <div className="p-1 rounded-md bg-emerald-100 text-emerald-600">
            <FileCheck className="h-4 w-4" />
          </div>
        )
      case "exam":
        return (
          <div className="p-1 rounded-md bg-rose-100 text-rose-600">
            <FileCheck className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="p-1 rounded-md bg-gray-100 text-gray-600">
            <FileText className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar curso</h1>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="bg-blue-50 dark:bg-blue-950">
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Contenido
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Estudiantes
          </TabsTrigger>
          <TabsTrigger
            value="grades"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Notas
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            Detalles
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
          >
            Precios
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
          >
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6 space-y-6">
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Estructura del curso
              </CardTitle>
              <CardDescription>
                Organiza los módulos, lecciones, tareas y exámenes de tu curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleAddModule}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir módulo
                  </Button>
                </div>

                <Accordion type="multiple" defaultValue={["1"]}>
                  {modules.map((module) => (
                    <AccordionItem
                      key={module.id}
                      value={module.id}
                      className="border border-blue-100 rounded-md mb-4"
                    >
                      <div className="flex items-center bg-blue-50 rounded-t-md">
                        <Grip className="ml-2 h-4 w-4 text-blue-400" />
                        <AccordionTrigger className="flex-1 hover:bg-blue-100 rounded-t-md px-4">
                          <span className="font-medium">{module.title}</span>
                        </AccordionTrigger>
                        <div className="flex items-center gap-2 pr-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar módulo</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Eliminar módulo</span>
                          </Button>
                        </div>
                      </div>
                      <AccordionContent className="bg-white">
                        <div className="space-y-2 pl-6 pt-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                            >
                              <div className="flex items-center gap-3">
                                <Grip className="h-4 w-4 text-gray-400" />
                                {getLessonIcon(lesson.type)}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {lesson.title}
                                    </span>
                                    <Badge
                                      variant={
                                        lesson.type === "video"
                                          ? "default"
                                          : lesson.type === "quiz"
                                            ? "secondary"
                                            : lesson.type === "assignment"
                                              ? "outline"
                                              : "destructive"
                                      }
                                    >
                                      {lesson.type === "video"
                                        ? "Video"
                                        : lesson.type === "quiz"
                                          ? "Cuestionario"
                                          : lesson.type === "assignment"
                                            ? "Tarea"
                                            : "Examen"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />{" "}
                                      {lesson.duration}
                                    </span>
                                    {(lesson.type === "quiz" ||
                                      lesson.type === "assignment" ||
                                      lesson.type === "exam") && (
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> Cierra:{" "}
                                        {new Date(
                                          lesson.closeDate
                                        ).toLocaleDateString()}
                                      </span>
                                    )}
                                    {lesson.resources.length > 0 && (
                                      <span className="flex items-center gap-1">
                                        <File className="h-3 w-3" />{" "}
                                        {lesson.resources.length} recursos
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                                  onClick={() =>
                                    lesson.type === "video"
                                      ? handleEditLesson(lesson)
                                      : handleEditAssignment(lesson)
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">
                                    Editar lección
                                  </span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">
                                    Eliminar lección
                                  </span>
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="mt-2 w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleAddContent(module.id)}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir contenido
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="mt-6 space-y-6">
          <Card className="border-purple-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Estudiantes del curso
              </CardTitle>
              <CardDescription>
                Gestiona los estudiantes inscritos en este curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Buscar estudiantes..."
                    className="w-[250px]"
                  />
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Filtrar
                  </Button>
                </div>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setIsAddStudentDialogOpen(true)}
                >
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
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(0)}`}
                              />
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {student.email}
                              </div>
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
                              onClick={() => handleViewStudentDetails(student)}
                            >
                              Ver detalles
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
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
        </TabsContent>

        <TabsContent value="grades" className="mt-6 space-y-6">
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
                          module.lessons.filter(
                            (lesson) =>
                              lesson.type === "quiz" ||
                              lesson.type === "assignment" ||
                              lesson.type === "exam"
                          )
                        )
                        .map((evaluation) => (
                          <th key={evaluation.id} className="p-3 bg-green-50">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {evaluation.title}
                              </span>
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
                          <span className="text-xs text-muted-foreground">
                            Final
                          </span>
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
                              module.lessons.filter(
                                (lesson) =>
                                  lesson.type === "quiz" ||
                                  lesson.type === "assignment" ||
                                  lesson.type === "exam"
                              )
                            )
                            .map((evaluation) => {
                              const studentGrade = student.grades.find(
                                (grade) => grade.evaluationId === evaluation.id
                              )
                              const grade = studentGrade
                                ? studentGrade.grade
                                : "-"
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
                                  key={`${student.studentId}-${evaluation.id}`}
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

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Resumen de evaluaciones</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {modules
                    .flatMap((module) =>
                      module.lessons.filter(
                        (lesson) =>
                          lesson.type === "quiz" ||
                          lesson.type === "assignment" ||
                          lesson.type === "exam"
                      )
                    )
                    .map((evaluation) => {
                      // Calcular el promedio de esta evaluación
                      const grades = studentGrades
                        .map(
                          (student) =>
                            student.grades.find(
                              (grade) => grade.evaluationId === evaluation.id
                            )?.grade || 0
                        )
                        .filter((grade) => grade > 0)

                      const averageGrade =
                        grades.length > 0
                          ? Math.round(
                              grades.reduce((sum, grade) => sum + grade, 0) /
                                grades.length
                            )
                          : 0

                      return (
                        <Card key={evaluation.id} className="border-green-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              {evaluation.title}
                            </CardTitle>
                            <CardDescription>
                              {evaluation.type === "quiz"
                                ? "Cuestionario"
                                : evaluation.type === "assignment"
                                  ? "Tarea"
                                  : "Examen"}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Promedio:
                              </span>
                              <span
                                className={`inline-block text-center py-1 px-2 rounded-md font-medium ${
                                  averageGrade >= 80
                                    ? "text-green-600 bg-green-50"
                                    : averageGrade >= 60
                                      ? "text-amber-600 bg-amber-50"
                                      : "text-red-600 bg-red-50"
                                }`}
                              >
                                {averageGrade}%
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-6 space-y-6">
          <Card className="border-emerald-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Detalles del curso
              </CardTitle>
              <CardDescription>
                Información básica sobre tu curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Título del curso</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Desarrollo Web Completo"
                    defaultValue="Desarrollo Web Completo"
                    className="border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    placeholder="Ej: Aprende HTML, CSS, JavaScript, PHP y más"
                    defaultValue="Aprende HTML, CSS, JavaScript, PHP y más"
                    className="border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu curso..."
                    className="min-h-[150px] border-emerald-200 focus-visible:ring-emerald-500"
                    defaultValue="En este curso aprenderás desarrollo web desde cero hasta convertirte en un desarrollador full-stack. Cubriremos HTML, CSS, JavaScript, PHP, MySQL y mucho más."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    placeholder="Ej: Desarrollo Web"
                    defaultValue="Desarrollo Web"
                    className="border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="level">Nivel</Label>
                  <Input
                    id="level"
                    placeholder="Ej: Principiante"
                    defaultValue="Todos los niveles"
                    className="border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6 space-y-6">
          <Card className="border-amber-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-600" />
                Precios
              </CardTitle>
              <CardDescription>
                Configura los precios de tu curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="price">Precio (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Ej: 49.99"
                    defaultValue="49.99"
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="discount-price">
                    Precio con descuento (USD)
                  </Label>
                  <Input
                    id="discount-price"
                    type="number"
                    placeholder="Ej: 19.99"
                    defaultValue="19.99"
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card className="border-rose-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-rose-600" />
                Configuración
              </CardTitle>
              <CardDescription>Ajustes generales del curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="language">Idioma</Label>
                  <Input
                    id="language"
                    placeholder="Ej: Español"
                    defaultValue="Español"
                    className="border-rose-200 focus-visible:ring-rose-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">Estado</Label>
                  <Select defaultValue="published">
                    <SelectTrigger className="border-rose-200 focus-visible:ring-rose-500">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments">Permitir comentarios</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que los estudiantes comenten en las lecciones
                    </p>
                  </div>
                  <Switch id="comments" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="certificate">
                      Certificado de finalización
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Emitir certificado al completar el curso
                    </p>
                  </div>
                  <Switch id="certificate" defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para añadir contenido unificado */}
      <Dialog
        open={isAddContentDialogOpen}
        onOpenChange={setIsAddContentDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Añadir contenido</DialogTitle>
            <DialogDescription>
              Selecciona el tipo de contenido que deseas añadir
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup
              value={contentType}
              onValueChange={setContentType}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="lesson"
                  id="lesson"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="lesson"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50"
                >
                  <Video className="mb-2 h-6 w-6 text-blue-500" />
                  <div className="font-medium">Lección</div>
                  <div className="text-xs text-muted-foreground">
                    Añadir video o contenido
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="quiz"
                  id="quiz"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="quiz"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50 [&:has([data-state=checked])]:border-amber-500 [&:has([data-state=checked])]:bg-amber-50"
                >
                  <CheckSquare className="mb-2 h-6 w-6 text-amber-500" />
                  <div className="font-medium">Cuestionario</div>
                  <div className="text-xs text-muted-foreground">
                    Añadir preguntas de evaluación
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="assignment"
                  id="assignment"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="assignment"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-emerald-500 [&:has([data-state=checked])]:bg-emerald-50"
                >
                  <ClipboardList className="mb-2 h-6 w-6 text-emerald-500" />
                  <div className="font-medium">Tarea</div>
                  <div className="text-xs text-muted-foreground">
                    Añadir tarea práctica
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="exam"
                  id="exam"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="exam"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 [&:has([data-state=checked])]:bg-rose-50"
                >
                  <FileCheck className="mb-2 h-6 w-6 text-rose-500" />
                  <div className="font-medium">Examen</div>
                  <div className="text-xs text-muted-foreground">
                    Añadir evaluación final
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {contentType === "lesson" && (
              <div className="space-y-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="lesson-title">Título de la lección</Label>
                  <Input
                    id="lesson-title"
                    placeholder="Ej: Introducción a HTML"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-description">Descripción</Label>
                  <Textarea
                    id="lesson-description"
                    placeholder="Describe esta lección..."
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-video">Video</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="lesson-video"
                      type="file"
                      accept="video/*"
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Subir
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {(contentType === "quiz" ||
              contentType === "assignment" ||
              contentType === "exam") && (
              <div className="space-y-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignment-title">Título</Label>
                  <Input
                    id="assignment-title"
                    placeholder={`Ej: ${contentType === "quiz" ? "Cuestionario de conceptos básicos" : contentType === "assignment" ? "Tarea práctica" : "Examen final"}`}
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-description">Descripción</Label>
                  <Textarea
                    id="assignment-description"
                    placeholder="Describe esta actividad..."
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-duration">Duración</Label>
                  <Input
                    id="assignment-duration"
                    placeholder="Ej: 30 min, 2 horas, etc."
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="assignment-open">Fecha de apertura</Label>
                    <Input
                      id="assignment-open"
                      type="datetime-local"
                      className="border-amber-200 focus-visible:ring-amber-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignment-close">Fecha de cierre</Label>
                    <Input
                      id="assignment-close"
                      type="datetime-local"
                      className="border-amber-200 focus-visible:ring-amber-500"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-publish">
                    Fecha de publicación
                  </Label>
                  <Input
                    id="assignment-publish"
                    type="datetime-local"
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddContentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className={
                contentType === "lesson"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : contentType === "quiz"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : contentType === "assignment"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-rose-600 hover:bg-rose-700"
              }
              onClick={() => setIsAddContentDialogOpen(false)}
            >
              Añadir{" "}
              {contentType === "lesson"
                ? "lección"
                : contentType === "quiz"
                  ? "cuestionario"
                  : contentType === "assignment"
                    ? "tarea"
                    : "examen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para añadir módulo */}
      <Dialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir nuevo módulo</DialogTitle>
            <DialogDescription>
              Crea un nuevo módulo para tu curso
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="module-title">Título del módulo</Label>
              <Input
                id="module-title"
                placeholder="Ej: Introducción a HTML y CSS"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="module-description">Descripción (opcional)</Label>
              <Textarea
                id="module-description"
                placeholder="Describe este módulo..."
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddModuleDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAddModuleDialogOpen(false)}
            >
              Añadir módulo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para añadir estudiante */}
      <Dialog
        open={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir estudiante</DialogTitle>
            <DialogDescription>
              Añade un nuevo estudiante a este curso
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="student-email">Email del estudiante</Label>
              <Input
                id="student-email"
                type="email"
                placeholder="estudiante@ejemplo.com"
                className="border-purple-200 focus-visible:ring-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Label htmlFor="student-name">Nombre</Label>
                <Input
                  id="student-name"
                  placeholder="Nombre del estudiante"
                  className="border-purple-200 focus-visible:ring-purple-500"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="student-lastname">Apellido</Label>
                <Input
                  id="student-lastname"
                  placeholder="Apellido del estudiante"
                  className="border-purple-200 focus-visible:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="send-invitation">Enviar invitación</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar email de invitación al estudiante
                </p>
              </div>
              <Switch id="send-invitation" defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddStudentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddStudentDialogOpen(false)}
            >
              Añadir estudiante
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para ver detalles del estudiante */}
      <Dialog
        open={isStudentDetailsDialogOpen}
        onOpenChange={setIsStudentDetailsDialogOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del estudiante</DialogTitle>
            <DialogDescription>
              Información detallada y progreso del estudiante
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`/placeholder.svg?height=64&width=64&text=${selectedStudent.name.charAt(0)}`}
                  />
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                    {selectedStudent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedStudent.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Progreso del curso</h4>
                <div className="flex items-center gap-2">
                  <Progress
                    value={selectedStudent.progress}
                    className="h-2 flex-1"
                  />
                  <span className="font-medium">
                    {selectedStudent.progress}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Última actividad: {selectedStudent.lastActive}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Módulos completados</h4>
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {index === 0
                            ? "Completado"
                            : index === 1
                              ? "En progreso"
                              : "No iniciado"}
                        </p>
                      </div>
                      <Progress
                        value={index === 0 ? 100 : index === 1 ? 45 : 0}
                        className="h-2 w-24"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Calificaciones</h4>
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Evaluación</th>
                      <th className="pb-2">Tipo</th>
                      <th className="pb-2">Calificación</th>
                      <th className="pb-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Cuestionario inicial</td>
                      <td className="py-2">Cuestionario</td>
                      <td className="py-2">85%</td>
                      <td className="py-2">
                        <Badge className="bg-green-500">Completado</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">
                        Tarea práctica: Implementación básica
                      </td>
                      <td className="py-2">Tarea</td>
                      <td className="py-2">78%</td>
                      <td className="py-2">
                        <Badge className="bg-green-500">Completado</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Examen final del módulo</td>
                      <td className="py-2">Examen</td>
                      <td className="py-2">-</td>
                      <td className="py-2">
                        <Badge variant="outline">Pendiente</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStudentDetailsDialogOpen(false)}
            >
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Enviar mensaje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar lección de video con pestaña de recursos */}
      <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar lección</DialogTitle>
            <DialogDescription>
              Modifica los detalles de esta lección
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={lessonEditTab}
            onValueChange={setLessonEditTab}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="lesson-title">Título</Label>
                <Input
                  id="lesson-title"
                  defaultValue={editingLesson?.title}
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-description">Descripción</Label>
                <Textarea
                  id="lesson-description"
                  placeholder="Describe esta lección..."
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-video">Video</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="lesson-video"
                    type="file"
                    accept="video/*"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Subir
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="resource-name">Nombre del recurso</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="resource-name"
                    placeholder="Ej: Guía de referencia.pdf"
                    className="border-blue-200 focus-visible:ring-blue-500"
                    value={newResourceName}
                    onChange={(e) => setNewResourceName(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() =>
                      handleAddResource(newResourceName, editingLesson)
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource-file">Archivo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="resource-file"
                    type="file"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Subir
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 mt-4">
                <h4 className="font-medium mb-2">Recursos actuales</h4>
                {editingLesson?.resources &&
                editingLesson.resources.length > 0 ? (
                  <div className="space-y-2">
                    {editingLesson.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <span>{resource.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                            onClick={() =>
                              handleDeleteResource(
                                resource.id,
                                editingLesson.id
                              )
                            }
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No hay recursos para esta lección
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLessonDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsLessonDialogOpen(false)}
            >
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar tarea/examen con pestaña de recursos */}
      <Dialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingAssignment?.type === "quiz"
                ? "Editar cuestionario"
                : editingAssignment?.type === "assignment"
                  ? "Editar tarea"
                  : "Editar examen"}
            </DialogTitle>
            <DialogDescription>
              Configura los detalles y tiempos
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={assignmentEditTab}
            onValueChange={setAssignmentEditTab}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="assignment-title">Título</Label>
                <Input
                  id="assignment-title"
                  defaultValue={editingAssignment?.title}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-description">Descripción</Label>
                <Textarea
                  id="assignment-description"
                  placeholder="Describe esta actividad..."
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-duration">Duración</Label>
                <Input
                  id="assignment-duration"
                  defaultValue={editingAssignment?.duration}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignment-open">Fecha de apertura</Label>
                  <Input
                    id="assignment-open"
                    type="datetime-local"
                    defaultValue={editingAssignment?.openDate}
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-close">Fecha de cierre</Label>
                  <Input
                    id="assignment-close"
                    type="datetime-local"
                    defaultValue={editingAssignment?.closeDate}
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-publish">Fecha de publicación</Label>
                <Input
                  id="assignment-publish"
                  type="datetime-local"
                  defaultValue={editingAssignment?.publishDate}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="assignment-attempts">
                    Intentos múltiples
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir múltiples intentos
                  </p>
                </div>
                <Switch id="assignment-attempts" />
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="assignment-resource-name">
                  Nombre del recurso
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="assignment-resource-name"
                    placeholder="Ej: Instrucciones de la tarea.pdf"
                    className="border-amber-200 focus-visible:ring-amber-500"
                    value={newResourceName}
                    onChange={(e) => setNewResourceName(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="border-amber-200 text-amber-600 hover:bg-amber-50"
                    onClick={() =>
                      handleAddResource(newResourceName, editingAssignment)
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-resource-file">Archivo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="assignment-resource-file"
                    type="file"
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                  <Button
                    variant="outline"
                    className="border-amber-200 text-amber-600 hover:bg-amber-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Subir
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 mt-4">
                <h4 className="font-medium mb-2">Recursos actuales</h4>
                {editingAssignment?.resources &&
                editingAssignment.resources.length > 0 ? (
                  <div className="space-y-2">
                    {editingAssignment.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <span>{resource.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                            onClick={() =>
                              handleDeleteResource(
                                resource.id,
                                editingAssignment.id
                              )
                            }
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No hay recursos para esta evaluación
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignmentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => setIsAssignmentDialogOpen(false)}
            >
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
