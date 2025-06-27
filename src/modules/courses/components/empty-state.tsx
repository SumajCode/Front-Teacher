"use client"

import { BookOpen } from "lucide-react"

interface EmptyStateProps {
  type: "all" | "published" | "draft" | "archived"
}

export function EmptyState({ type }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case "all":
        return {
          icon: <BookOpen className="h-6 w-6 text-blue-600" />,
          title: "No se encontraron cursos",
          description: "No hay cursos que coincidan con tu búsqueda.",
          bgColor: "bg-blue-100",
        }
      case "published":
        return {
          icon: <BookOpen className="h-6 w-6 text-green-600" />,
          title: "No hay cursos publicados",
          description: "Publica tus cursos para que aparezcan aquí.",
          bgColor: "bg-green-100",
        }
      case "draft":
        return {
          icon: <BookOpen className="h-6 w-6 text-amber-600" />,
          title: "No hay borradores",
          description: "Crea un nuevo curso para comenzar.",
          bgColor: "bg-amber-100",
        }
      case "archived":
        return {
          icon: <BookOpen className="h-6 w-6 text-gray-600" />,
          title: "No hay cursos archivados",
          description: "Los cursos archivados aparecerán aquí.",
          bgColor: "bg-gray-100",
        }
      default:
        return {
          icon: <BookOpen className="h-6 w-6 text-blue-600" />,
          title: "No se encontraron cursos",
          description: "No hay cursos que coincidan con tu búsqueda.",
          bgColor: "bg-blue-100",
        }
    }
  }

  const content = getEmptyStateContent()

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className={`rounded-full ${content.bgColor} p-3 mb-4`}>{content.icon}</div>
      <h3 className="text-lg font-medium">{content.title}</h3>
      <p className="text-muted-foreground mt-1 mb-4">{content.description}</p>
    </div>
  )
}
