export interface Course {
  id: string
  title: string
  status: "published" | "draft" | "archived"
  students: number
  rating: number
  revenue: string
  lastUpdated: string
  description: string
  image: string
  modules: number
  archivo: Archivos[]
  duration: string
  color: string
}
export interface Archivos {
  _id: string
  nombre: string
  url: string
}
export interface Resource {
  id: string
  name: string
  type: string
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "quiz" | "assignment" | "exam"
  duration: string
  resources: Resource[]
  openDate?: string
  closeDate?: string
  publishDate?: string
  grade?: number
}

// Represents additional rules for assignments or quizzes
export interface Rules {
  functions?: {
    functionNames: string[]
  }
  imports?: string[]
}

// Represents a content item (lesson, assignment, quiz, etc.) in a module
export interface ContentItem {
  _id: string
  id_contenido: string
  id_modulo: string
  title: string
  type: string
  timestamp: string
  time_deliver?: string
  content: {
    description?: string
    points?: number
    rules?: Rules
    status?: string
  }
  files?: string[]
}

export interface Module {
  id: string
  title: string
  archivos: Archivos[]
  // content items for this module
  contenido: ContentItem[]
  // identifiers for filtering
  id_docente: number
  id_materia: number
  /** Descripción del módulo */
  desciption?: string
}

export interface Student {
  id: string
  name: string
  email: string
  progress: number
  lastActive: string
}

export interface StudentGrade {
  studentId: string
  name: string
  grades: {
    evaluationId: string
    grade: number
  }[]
}
