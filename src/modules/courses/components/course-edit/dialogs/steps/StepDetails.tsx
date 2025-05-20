"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface StepDetailsProps {
  contentType: string
  title: string
  setTitle: (val: string) => void
  description: string
  setDescription: (val: string) => void
  duration: string
  setDuration: (val: string) => void
  openDate: string
  setOpenDate: (val: string) => void
  closeDate: string
  setCloseDate: (val: string) => void
  publishDate: string
  setPublishDate: (val: string) => void
  color: string
}

export function StepDetails({
  contentType,
  title,
  setTitle,
  description,
  setDescription,
  duration,
  setDuration,
  openDate,
  setOpenDate,
  closeDate,
  setCloseDate,
  publishDate,
  setPublishDate,
  color,
}: StepDetailsProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="content-title" className={`text-${color}-600`}>
          Título *
        </Label>
        <Input
          id="content-title"
          placeholder={`Ej: ${
            contentType === "lesson"
              ? "Introducción a HTML"
              : contentType === "quiz"
                ? "Cuestionario de conceptos básicos"
                : contentType === "assignment"
                  ? "Tarea práctica"
                  : "Examen final"
          }`}
          className={`border-${color}-200 focus-visible:ring-${color}-500`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content-description" className={`text-${color}-600`}>
          Descripción
        </Label>
        <Textarea
          id="content-description"
          placeholder="Describe este contenido..."
          className={`border-${color}-200 focus-visible:ring-${color}-500`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content-duration" className={`text-${color}-600`}>
          Duración *
        </Label>
        <Input
          id="content-duration"
          placeholder="Ej: 30 min, 2 horas, etc."
          className={`border-${color}-200 focus-visible:ring-${color}-500`}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      {contentType !== "lesson" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="content-open" className={`text-${color}-600`}>
              Fecha de apertura
            </Label>
            <Input
              id="content-open"
              type="datetime-local"
              className={`border-${color}-200 focus-visible:ring-${color}-500`}
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content-close" className={`text-${color}-600`}>
              Fecha de cierre
            </Label>
            <Input
              id="content-close"
              type="datetime-local"
              className={`border-${color}-200 focus-visible:ring-${color}-500`}
              value={closeDate}
              onChange={(e) => setCloseDate(e.target.value)}
            />
          </div>
        </div>
      )}

      {contentType !== "lesson" && (
        <div className="grid gap-2">
          <Label htmlFor="content-publish" className={`text-${color}-600`}>
            Fecha de publicación
          </Label>
          <Input
            id="content-publish"
            type="datetime-local"
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </div>
      )}

      {contentType === "lesson" && (
        <div className="grid gap-2">
          <Label htmlFor="lesson-video" className={`text-${color}-600`}>
            Video
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="lesson-video"
              type="file"
              accept="video/*"
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
      )}
    </div>
  )
}
