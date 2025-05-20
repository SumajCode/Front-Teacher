"use client"

import React from "react"
import { Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AutosaveIndicatorProps {
  isAutosaving: boolean
  hasAutosavedData: boolean
  onReset: () => void
}

export function AutosaveIndicator({
  isAutosaving,
  hasAutosavedData,
  onReset,
}: AutosaveIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {isAutosaving && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1 rounded-full bg-blue-50 text-blue-600 animate-pulse">
                <Save className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Autoguardando...</p>
            </TooltipContent>
          </Tooltip>
        )}
        {hasAutosavedData && !isAutosaving && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1 rounded-full bg-green-50 text-green-600">
                <Save className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Autoguardado</p>
            </TooltipContent>
          </Tooltip>
        )}
        {hasAutosavedData && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 text-red-600 border-red-200 hover:bg-red-50"
                onClick={onReset}
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reiniciar formulario</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  )
}
