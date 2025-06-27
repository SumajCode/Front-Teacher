import React from "react"
import { Badge } from "@/components/ui/badge"
import { FileText, File } from "lucide-react"

export function getStatusBadge(status: string) {
  switch (status) {
    case "published":
      return <Badge className="bg-green-500 hover:bg-green-600">Publicado</Badge>
    case "draft":
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 hover:bg-amber-100">
          Borrador
        </Badge>
      )
    case "archived":
      return (
        <Badge variant="outline" className="border-gray-500 text-gray-600 bg-gray-50 hover:bg-gray-100">
          Archivado
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export function getColorClass(color: string) {
  switch (color) {
    case "blue":
      return "from-blue-500 to-blue-700"
    case "amber":
      return "from-amber-500 to-amber-700"
    case "cyan":
      return "from-cyan-500 to-cyan-700"
    case "green":
      return "from-green-500 to-green-700"
    case "purple":
      return "from-purple-500 to-purple-700"
    default:
      return "from-blue-500 to-blue-700"
  }
}

export function getResourceIcon(type: string) {
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
