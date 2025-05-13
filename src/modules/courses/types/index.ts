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
  lessons: number
  duration: string
  color: string
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

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
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
