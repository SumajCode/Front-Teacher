export interface Course {
  id: string
  title: string
  status: 'published' | 'draft' | 'archived'
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
