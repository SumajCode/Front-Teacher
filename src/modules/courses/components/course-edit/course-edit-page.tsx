"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ContentTab } from "@/modules/courses/components/course-edit/tabs/content-tab"
import { StudentsTab } from "@/modules/courses/components/course-edit/tabs/students-tab"
import { GradesTab } from "@/modules/courses/components/course-edit/tabs/grades-tab"
import { DetailsTab } from "@/modules/courses/components/course-edit/tabs/details-tab"

import { SettingsTab } from "@/modules/courses/components/course-edit/tabs/settings-tab"

import { AddContentDialog } from "@/modules/courses/components/course-edit/dialogs/add-content-dialog"
import { AddModuleDialog } from "@/modules/courses/components/course-edit/dialogs/add-module-dialog"
import { AddStudentDialog } from "@/modules/courses/components/course-edit/dialogs/add-student-dialog"
import { StudentDetailsDialog } from "@/modules/courses/components/course-edit/dialogs/student-details-dialog"
import { EditLessonDialog } from "@/modules/courses/components/course-edit/dialogs/edit-lesson-dialog"
import { EditAssignmentDialog } from "@/modules/courses/components/course-edit/dialogs/edit-assignment-dialog"
import { EditModuleDialog } from "@/modules/courses/components/course-edit/dialogs/edit-module-dialog"
import { DeleteModuleDialog } from "@/modules/courses/components/course-edit/dialogs/delete-module-dialog"

import { useCourseModules } from "@/modules/courses/hooks/use-course-modules"
import { useStudents } from "@/modules/courses/hooks/use-students"
import { useStudentGrades } from "@/modules/courses/hooks/use-student-grades"
import { courses } from "@/modules/courses/data/courses"
import type { Module } from "@/modules/courses/types"

export function CourseEditPage({ params }: { params: { courseId: string } }) {
  const { modules, setModules, handleAddResource, handleDeleteResource } =
    useCourseModules()
  const { students } = useStudents()
  const { studentGrades } = useStudentGrades()
  const [course, setCourse] = useState<any>(null)

  // Cargar datos del curso
  useEffect(() => {
    if (params.courseId) {
      const foundCourse = courses.find((c) => c.id === params.courseId)
      if (foundCourse) {
        setCourse(foundCourse)
      }
    }
  }, [params.courseId])

  const [editingLesson, setEditingLesson] = useState<any>(null)
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false)
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<any>(null)
  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false)
  const [contentType, setContentType] = useState<string>("lesson")
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [isEditModuleDialogOpen, setIsEditModuleDialogOpen] = useState(false)
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)
  const [isDeleteModuleDialogOpen, setIsDeleteModuleDialogOpen] =
    useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [isStudentDetailsDialogOpen, setIsStudentDetailsDialogOpen] =
    useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [lessonEditTab, setLessonEditTab] = useState("details")
  const [assignmentEditTab, setAssignmentEditTab] = useState("details")
  const [newResourceName, setNewResourceName] = useState("")
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null)

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
    setContentType("lesson") // Establecer un valor predeterminado
    setIsAddContentDialogOpen(true)
    // console.log("xd", { moduleId })
  }

  const handleAddModule = () => {
    setIsAddModuleDialogOpen(true)
  }

  const handleEditModule = (module: Module) => {
    setEditingModule(module)
    setIsEditModuleDialogOpen(true)
  }

  const handleDeleteModule = (moduleId: string) => {
    setModuleToDelete(moduleId)
    setIsDeleteModuleDialogOpen(true)
  }

  const handleViewStudentDetails = (student: any) => {
    setSelectedStudent(student)
    setIsStudentDetailsDialogOpen(true)
  }

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

  if (!course) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Cargando curso...</h2>
          <p className="text-muted-foreground">
            Por favor espera mientras cargamos la información
          </p>
        </div>
      </div>
    )
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
        <h1 className="text-3xl font-bold">Editar curso: {course.title}</h1>
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
            className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
          >
            Detalles
          </TabsTrigger>

          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
          >
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6 space-y-6">
          <ContentTab
            modules={modules}
            onAddModule={handleAddModule}
            onAddContent={handleAddContent}
            onEditLesson={handleEditLesson}
            onEditAssignment={handleEditAssignment}
            onEditModule={handleEditModule}
            onDeleteModule={handleDeleteModule}
          />
        </TabsContent>

        <TabsContent value="students" className="mt-6 space-y-6">
          <StudentsTab
            students={students}
            onAddStudent={() => setIsAddStudentDialogOpen(true)}
            onViewStudentDetails={handleViewStudentDetails}
          />
        </TabsContent>

        <TabsContent value="grades" className="mt-6 space-y-6">
          <GradesTab
            modules={modules}
            studentGrades={studentGrades}
            averageGrade={averageGrade}
          />
        </TabsContent>

        <TabsContent value="details" className="mt-6 space-y-6">
          <DetailsTab />
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>

      {/* Diálogos */}
      <AddContentDialog
        open={isAddContentDialogOpen}
        onOpenChange={setIsAddContentDialogOpen}
        contentType={contentType}
        setContentType={setContentType}
        currentModuleId={currentModuleId}
      />

      <AddModuleDialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
      />

      <AddStudentDialog
        open={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
      />

      <StudentDetailsDialog
        open={isStudentDetailsDialogOpen}
        onOpenChange={setIsStudentDetailsDialogOpen}
        student={selectedStudent}
        modules={modules}
      />

      <EditLessonDialog
        open={isLessonDialogOpen}
        onOpenChange={setIsLessonDialogOpen}
        lesson={editingLesson}
        activeTab={lessonEditTab}
        setActiveTab={setLessonEditTab}
        newResourceName={newResourceName}
        setNewResourceName={setNewResourceName}
        onAddResource={handleAddResource}
        onDeleteResource={handleDeleteResource}
      />

      <EditAssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        assignment={editingAssignment}
        activeTab={assignmentEditTab}
        setActiveTab={setAssignmentEditTab}
        newResourceName={newResourceName}
        setNewResourceName={setNewResourceName}
        onAddResource={handleAddResource}
        onDeleteResource={handleDeleteResource}
      />

      <EditModuleDialog
        open={isEditModuleDialogOpen}
        onOpenChange={setIsEditModuleDialogOpen}
        module={editingModule}
      />

      <DeleteModuleDialog
        open={isDeleteModuleDialogOpen}
        onOpenChange={setIsDeleteModuleDialogOpen}
        moduleId={moduleToDelete}
        onConfirm={(moduleId) => {
          // Aquí iría la lógica para eliminar el módulo
          setModules(modules.filter((m) => m.id !== moduleId))
          setIsDeleteModuleDialogOpen(false)
        }}
      />
    </div>
  )
}
