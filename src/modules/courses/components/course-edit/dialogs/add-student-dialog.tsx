"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materiaId: number;
  onStudentAdded: () => void;
}

export function AddStudentDialog({
  open,
  onOpenChange,
  materiaId,
  onStudentAdded,
}: AddStudentDialogProps) {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleAddStudent = async () => {
    if (!email || !nombre || !apellido) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const response = await fetch("https://microservice-docente.onrender.com/apidocentes/v1/matricula/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_materia: materiaId,
          estudiante: {
            nombre,
            apellido,
            correo: email,
          },
        }),
      });

      if (response.ok) {
        onStudentAdded();
        onOpenChange(false);
        clearFields();
      } else {
        alert("Error al matricular estudiante");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red");
    }
  };

  const handleUploadExcel = async () => {
    if (!file) {
      alert("Selecciona un archivo Excel (.xlsx)");
      return;
    }

    const formData = new FormData();
    formData.append("id_materia", materiaId.toString());
    formData.append("archivo", file);

    try {
      const response = await fetch(
        "https://microservice-docente.onrender.com/apidocentes/v1/matricula/crear/matriculas",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        onStudentAdded();
        onOpenChange(false);
        clearFields();
      } else {
        alert("Error al subir el archivo Excel");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red al subir el archivo");
    }
  };

  const clearFields = () => {
    setEmail("");
    setNombre("");
    setApellido("");
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir estudiante</DialogTitle>
          <DialogDescription>
            Puedes ingresar un estudiante manualmente o subir un archivo Excel (.xlsx)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="student-email">Correo electrónico</Label>
            <Input
              id="student-email"
              type="email"
              placeholder="estudiante@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-purple-200 focus-visible:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="student-name">Nombre</Label>
              <Input
                id="student-name"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border-purple-200 focus-visible:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="student-lastname">Apellido</Label>
              <Input
                id="student-lastname"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="border-purple-200 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="file">Subir archivo Excel (.xlsx)</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border-purple-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="send-invitation">Enviar invitación</Label>
              <p className="text-sm text-muted-foreground">(No implementado aún)</p>
            </div>
            <Switch id="send-invitation" defaultChecked disabled />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleAddStudent}
          >
            Añadir estudiante
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleUploadExcel}
          >
            Subir Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
