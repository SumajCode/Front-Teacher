"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Video, CheckSquare, ClipboardList, FileCheck } from "lucide-react"

interface StepTypeProps {
  contentType: string
  setContentType: (type: string) => void
}

export function StepType({ contentType, setContentType }: StepTypeProps) {
  return (
    <div className="grid gap-4 py-4">
      <RadioGroup
        value={contentType}
        onValueChange={setContentType}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem value="lesson" id="lesson" className="peer sr-only" />
          <Label
            htmlFor="lesson"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50"
          >
            <Video className="mb-2 h-6 w-6 text-blue-500" />
            <div className="font-medium">Lección</div>
            <div className="text-xs text-muted-foreground">
              Añadir video o contenido
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="quiz" id="quiz" className="peer sr-only" />
          <Label
            htmlFor="quiz"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50 [&:has([data-state=checked])]:border-amber-500 [&:has([data-state=checked])]:bg-amber-50"
          >
            <CheckSquare className="mb-2 h-6 w-6 text-amber-500" />
            <div className="font-medium">Cuestionario</div>
            <div className="text-xs text-muted-foreground">
              Añadir preguntas de evaluación
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="assignment"
            id="assignment"
            className="peer sr-only"
          />
          <Label
            htmlFor="assignment"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-emerald-500 [&:has([data-state=checked])]:bg-emerald-50"
          >
            <ClipboardList className="mb-2 h-6 w-6 text-emerald-500" />
            <div className="font-medium">Tarea</div>
            <div className="text-xs text-muted-foreground">
              Añadir tarea práctica
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="exam" id="exam" className="peer sr-only" />
          <Label
            htmlFor="exam"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 [&:has([data-state=checked])]:border-rose-500 [&:has([data-state=checked])]:bg-rose-50"
          >
            <FileCheck className="mb-2 h-6 w-6 text-rose-500" />
            <div className="font-medium">Examen</div>
            <div className="text-xs text-muted-foreground">
              Añadir evaluación final
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
