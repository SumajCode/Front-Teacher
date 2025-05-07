'use client'

import { useState } from 'react'
import { File, FileText } from 'lucide-react'

interface Resource {
  id: string
  name: string
  type: string
}

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [newResourceName, setNewResourceName] = useState('')

  // Función para manejar la adición de recursos
  const handleAddResource = () => {
    if (!newResourceName.trim()) return

    const fileType = newResourceName.split('.').pop() || 'pdf'

    setResources([
      ...resources,
      {
        id: `resource-${Date.now()}`,
        name: newResourceName,
        type: fileType,
      },
    ])

    setNewResourceName('')
  }

  // Función para eliminar un recurso
  const handleRemoveResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  // Función para obtener el icono según el tipo de archivo
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <div className="p-1 rounded-md bg-rose-100 text-rose-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case 'doc':
      case 'docx':
        return (
          <div className="p-1 rounded-md bg-blue-100 text-blue-600">
            <FileText className="h-4 w-4" />
          </div>
        )
      case 'zip':
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

  return {
    resources,
    newResourceName,
    setNewResourceName,
    handleAddResource,
    handleRemoveResource,
    getResourceIcon,
  }
}
