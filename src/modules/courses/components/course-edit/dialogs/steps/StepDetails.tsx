"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"

interface StepDetailsProps {
  title: string
  setTitle: (val: string) => void
  description: string
  setDescription: (val: string) => void
  color: string
}

export function StepDetails({
  title,
  setTitle,
  description,
  setDescription,
  color,
}: StepDetailsProps) {
  const [classNames, setClassNames] = useState<string[]>([""])
  const [classCodes, setClassCodes] = useState<string[]>([""])
  const [functionNames, setFunctionNames] = useState<string[]>([""])
  const [functionCodes, setFunctionCodes] = useState<string[]>([""])
  const [imports, setImports] = useState<string[]>([""])

  const handleListChange = (
    list: string[],
    setList: (val: string[]) => void,
    index: number,
    value: string
  ) => {
    const updated = [...list]
    updated[index] = value
    setList(updated)
  }

  const addField = (list: string[], setList: (val: string[]) => void) => {
    setList([...list, ""])
  }

  return (
    <div className="space-y-4 py-4">
      {/* Título */}
      <div className="grid gap-2">
        <Label htmlFor="content-title" className={`text-${color}-600`}>
          Título *
        </Label>
        <Input
          id="content-title"
          placeholder="Ej: Tarea práctica"
          className={`border-${color}-200 focus-visible:ring-${color}-500`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Descripción */}
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

      {/* Reglas: Clases */}
      <div className="grid gap-2">
        <Label className={`text-${color}-600`}>Nombres de clases</Label>
        {classNames.map((name, idx) => (
          <Input
            key={idx}
            value={name}
            placeholder={`Clase ${idx + 1}`}
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            onChange={(e) => handleListChange(classNames, setClassNames, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(classNames, setClassNames)}>+ Añadir clase</button>
      </div>

      <div className="grid gap-2">
        <Label className={`text-${color}-600`}>Código de clases</Label>
        {classCodes.map((code, idx) => (
          <Textarea
            key={idx}
            value={code}
            placeholder={`Código clase ${idx + 1}`}
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            onChange={(e) => handleListChange(classCodes, setClassCodes, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(classCodes, setClassCodes)}>+ Añadir código</button>
      </div>

      {/* Reglas: Funciones */}
      <div className="grid gap-2">
        <Label className={`text-${color}-600`}>Nombres de funciones</Label>
        {functionNames.map((name, idx) => (
          <Input
            key={idx}
            value={name}
            placeholder={`Función ${idx + 1}`}
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            onChange={(e) => handleListChange(functionNames, setFunctionNames, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(functionNames, setFunctionNames)}>+ Añadir función</button>
      </div>

      <div className="grid gap-2">
        <Label className={`text-${color}-600`}>Código de funciones</Label>
        {functionCodes.map((code, idx) => (
          <Textarea
            key={idx}
            value={code}
            placeholder={`Código función ${idx + 1}`}
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            onChange={(e) => handleListChange(functionCodes, setFunctionCodes, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(functionCodes, setFunctionCodes)}>+ Añadir código</button>
      </div>

      {/* Reglas: Imports */}
      <div className="grid gap-2">
        <Label className={`text-${color}-600`}>Imports requeridos</Label>
        {imports.map((imp, idx) => (
          <Input
            key={idx}
            value={imp}
            placeholder={`Import ${idx + 1}`}
            className={`border-${color}-200 focus-visible:ring-${color}-500`}
            onChange={(e) => handleListChange(imports, setImports, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(imports, setImports)}>+ Añadir import</button>
      </div>
    </div>
  )
}
