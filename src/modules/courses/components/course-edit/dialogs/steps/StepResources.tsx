"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Upload, File, FileText, Trash } from "lucide-react"

interface Resource {
  id: string
  name: string
  type: string
}

interface StepResourcesProps {
  newResourceName: string
  setNewResourceName: (val: string) => void
  handleAddResource: () => void
  /** Handler for dropped files */
  handleFileDrop: (file: File) => void
  resources: Resource[]
  handleRemoveResource: (id: string) => void
  color: string
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

export function StepResources({
  newResourceName,
  setNewResourceName,
  handleAddResource,
  resources,
  handleRemoveResource,
  color,
  handleFileDrop,
}: StepResourcesProps) {
  return (
    <div className="space-y-4 py-4">
      {/* Zona de arrastrar y soltar */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const files = e.dataTransfer.files
          for (let i = 0; i < files.length; i++) {
            handleFileDrop(files[i])
          }
        }}
        className={`border-2 border-${color}-300 border-dashed rounded-md p-4 text-center text-${color}-500`}
      >
        Arrastra y suelta archivos aquí
      </div>
      <div className="grid gap-2">
        <Label htmlFor="resource-name" className={`text-${color}-600`}>
          Nombre del recurso
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="resource-name"
            placeholder="Ej: Guía de referencia.pdf"
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
          />
          <Button
            variant="outline"
            className={`border-${color}-200 text-${color}-600 hover:bg-${color}-50`}
            onClick={handleAddResource}
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir
          </Button>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="resource-file" className={`text-${color}-600`}>
          Archivo
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="resource-file"
            type="file"
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
          />
          <Button
            variant="outline"
            className={`border-${color}-200 text-${color}-600 hover:bg-${color}-50`}
          >
            <Upload className="mr-2 h-4 w-4" />
            Subir
          </Button>
        </div>
      </div>

      <div className={`border border-${color}-100 rounded-md p-4 mt-4`}>
        <h4 className="font-medium mb-2">Recursos añadidos</h4>
        {resources.length > 0 ? (
          <div className="space-y-2">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource.type)}
                  <span>{resource.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                  onClick={() => handleRemoveResource(resource.id)}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay recursos añadidos todavía
          </p>
        )}
      </div>
    </div>
  )
}
