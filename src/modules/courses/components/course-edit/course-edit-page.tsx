"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ContentTab } from "@/modules/courses/components/course-edit/tabs/content-tab"
import { StudentsTab } from "@/modules/courses/components/course-edit/tabs/students-tab"

import { AddContentDialog } from "@/modules/courses/components/course-edit/dialogs/add-content-dialog"
import { AddModuleDialog } from "@/modules/courses/components/course-edit/dialogs/add-module-dialog"
import { AddStudentDialog } from "@/modules/courses/components/course-edit/dialogs/add-student-dialog"
import { StudentDetailsDialog } from "@/modules/courses/components/course-edit/dialogs/student-details-dialog"

import { EditAssignmentDialog } from "@/modules/courses/components/course-edit/dialogs/edit-assignment-dialog"
import { EditModuleDialog } from "@/modules/courses/components/course-edit/dialogs/edit-module-dialog"
import { DeleteModuleDialog } from "@/modules/courses/components/course-edit/dialogs/delete-module-dialog"

import { useCourseModules } from "@/modules/courses/hooks/use-course-modules"
import type { Module, AssignmentWithResources } from "@/modules/courses/types"

interface Materia {
  nombre_materia: string;
  // agrega otros campos si los necesitas
}

// Definición local para Student que coincide con StudentsTab
interface StudentDialog {
  nombre_estudiante: string;
  apellido_estudiante: string;
  correo_estudiante: string;
}

export function CourseEditPage({ courseId }: { courseId: string }) {
  const {
    modules,
  } = useCourseModules()

  const [course, setCourse] = useState<Materia | null>(null)

  // Cargar datos del curso
  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(
          "https://microservice-docente.onrender.com/apidocentes/v1/materia/listar",
          {
            method: "GET",
          }
        )
        const result = await response.json()
        setCourse(Array.isArray(result.data) ? result.data[0] : result.data)
      } catch (error) {
        console.error("Error fetching course from API", error)
      }
    }
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<AssignmentWithResources | null>(null)
  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false)
  const [contentType, setContentType] = useState<string>("assignment")
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [isEditModuleDialogOpen, setIsEditModuleDialogOpen] = useState(false)
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)
  const [isDeleteModuleDialogOpen, setIsDeleteModuleDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [isStudentDetailsDialogOpen, setIsStudentDetailsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentDialog | null>(null)
  const [assignmentEditTab, setAssignmentEditTab] = useState("details")
  const [newResourceName, setNewResourceName] = useState("")
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null)
  const [reload, setReload] = useState(false)

  const handleEditAssignment = (assignment: AssignmentWithResources) => {
    setEditingAssignment(assignment)
    setAssignmentEditTab("details")
    setIsAssignmentDialogOpen(true)
  }

  const handleAddContent = (moduleId: string) => {
    setCurrentModuleId(moduleId)
    setTimeout(() => {
      setIsAddContentDialogOpen(true)
    }, 0)
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

  const handleViewStudentDetails = (student: StudentDialog) => {
    setSelectedStudent(student)
    setIsStudentDetailsDialogOpen(true)
  }

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
        <h1 className="text-3xl font-bold">
          Editar curso: {course?.nombre_materia || "Nombre no disponible"}
        </h1>
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
        </TabsList>

        <TabsContent value="content" className="mt-6 space-y-6">
          <ContentTab
            courseId={courseId}
            modules={modules}
            onAddModule={handleAddModule}
            onAddContent={handleAddContent}
            onEditAssignment={handleEditAssignment}
            onEditModule={handleEditModule}
            onDeleteModule={handleDeleteModule}
          />
        </TabsContent>

        <TabsContent value="students" className="mt-6 space-y-6">
          <StudentsTab
            courseId={courseId}
            onAddStudent={() => setIsAddStudentDialogOpen(true)}
            onViewStudentDetails={handleViewStudentDetails}
            refreshTrigger={reload ? 1 : 0}
          />
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
        courseId={courseId}
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onModuleCreated={(id) => {
          setCurrentModuleId(id)
          setIsAddContentDialogOpen(true)
        }}
      />

      <AddStudentDialog
        open={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
        materiaId={Number(courseId)}
        onStudentAdded={() => setReload(prev => !prev)}
      />

      <StudentDetailsDialog
        open={isStudentDetailsDialogOpen}
        onOpenChange={setIsStudentDetailsDialogOpen}
        student={selectedStudent ? {
          id: '',
          name: selectedStudent.nombre_estudiante + ' ' + selectedStudent.apellido_estudiante,
          email: selectedStudent.correo_estudiante,
          progress: 0,
          lastActive: ''
        } : null}
        modules={modules}
      />

      <EditAssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        assignment={editingAssignment}
        activeTab={assignmentEditTab}
        setActiveTab={setAssignmentEditTab}
        newResourceName={newResourceName}
        setNewResourceName={setNewResourceName}
        moduleId={currentModuleId ?? ""}
        onAddResource={() => {}}
        onDeleteResource={() => {}}
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
      />
    </div>
  )
}
