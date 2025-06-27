"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { crearTarea } from "@/services/tareaService";
import {
  Upload,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  File,
  FileText,
  Trash,
} from "lucide-react";

interface AddContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentType: string;
  setContentType: (type: string) => void;
  currentModuleId: string | null;
}

export function AddContentDialog({
  open,
  onOpenChange,
  contentType,
  setContentType,
  currentModuleId,
}: AddContentDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [functionNames, setFunctionNames] = useState<string[]>([""]);
  const [functionCodes, setFunctionCodes] = useState<string[]>([""]);
  const [imports, setImports] = useState<string[]>([""]);
  const [resources, setResources] = useState<{ id: string; name: string; type: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    setErrorMsg(null);
    onOpenChange(open);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);
  const handleNext = () => setCurrentStep(currentStep + 1);

const handleFinish = async () => {
  if (!currentModuleId) {
    
    setErrorMsg("❌ No se ha proporcionado el ID del módulo.");
    return;
  }

    const payload = {
    todo: "false",
    data: {
      id_modulo: currentModuleId,
      title,
      type: "tarea",
      content: {
        description,
        rules: {
          functions: {
            functionNames,
            functionCodes,
          },
          imports,
        },
      },
    },
  carpeta_nombre: "Estructuras de Datos", // ✅ Inclúyelo si el backend lo espera
  modulo: "Módulo 1 - Introducción",      // ✅ También si es necesario
};

  try {
    console.log("Payload a enviar:", payload); // 💡 útil para debug
    const response = await crearTarea(payload);
    console.log("Tarea creada con éxito:", response);
    handleOpenChange(false);
  } catch (error: unknown) {
    console.error("Error al crear la tarea:", error);
    setErrorMsg("❌ Error al crear la tarea.");
  }
};

  const color = "emerald";

  const getResourceIcon = (type: string) => {
    const baseClass = "p-1 rounded-md";
    if (type === "pdf") return <div className={`${baseClass} bg-rose-100 text-rose-600`}><FileText className="h-4 w-4" /></div>;
    if (["doc", "docx"].includes(type)) return <div className={`${baseClass} bg-blue-100 text-blue-600`}><FileText className="h-4 w-4" /></div>;
    if (type === "zip") return <div className={`${baseClass} bg-amber-100 text-amber-600`}><File className="h-4 w-4" /></div>;
    return <div className={`${baseClass} bg-gray-100 text-gray-600`}><File className="h-4 w-4" /></div>;
  };

  const handleAddField = (setFunc: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFunc((prev: string[]) => [...prev, ""]);
  };

  const handleChangeField = (
    setFunc: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setFunc((prev: string[]) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const onAddResource = (file: File) => {
    const fileType = file.name.split(".").pop() || "pdf";
    setResources(prev => [...prev, { id: `resource-${uuidv4()}`, name: file.name, type: fileType }]);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className={`text-${color}-700`}>Añadir tarea</DialogTitle>
          <DialogDescription>
            Completa los siguientes pasos para añadir una nueva tarea al módulo
          </DialogDescription>
        </DialogHeader>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        {currentStep === 1 && (
          <div className="grid gap-4 py-4">
            <RadioGroup value={contentType} onValueChange={setContentType} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="assignment" id="assignment" className="peer sr-only" />
                <Label htmlFor="assignment" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50">
                  <ClipboardList className="mb-2 h-6 w-6 text-emerald-500" />
                  <div className="font-medium">Tarea</div>
                  <div className="text-xs text-muted-foreground">Añadir tarea práctica</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-title" className={`text-${color}-600`}>Título *</Label>
              <Input id="content-title" placeholder="Ej: Tarea práctica" className={`border-${color}-200 focus-visible:ring-${color}-500`} value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-description" className={`text-${color}-600`}>Descripción</Label>
              <Textarea id="content-description" placeholder="Describe este contenido..." className={`border-${color}-200 focus-visible:ring-${color}-500`} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {[{ label: "Nombres de funciones", items: functionNames, setter: setFunctionNames, id: "func" },
              { label: "Código de funciones", items: functionCodes, setter: setFunctionCodes, id: "funccode" },
              { label: "Imports requeridos", items: imports, setter: setImports, id: "import" },
            ].map(({ label, items, setter, id }) => (
              <div key={id} className="grid gap-2">
                <Label className={`text-${color}-600`}>{label}</Label>
                {items.map((val, i) => (
                  <Input key={i} placeholder={`${label.split(" ")[0]} ${i + 1}`} value={val} onChange={(e) => handleChangeField(setter, i, e.target.value)} className={`border-${color}-200 focus-visible:ring-${color}-500`} />
                ))}
                <Button type="button" variant="ghost" onClick={() => handleAddField(setter)} className={`text-${color}-600`}>
                  + Añadir {label.toLowerCase().split(" ")[0]}
                </Button>
              </div>
            ))}

            <div className="grid gap-2">
              <Label htmlFor="resource-files">Recursos</Label>
              <input id="resource-files" type="file" multiple className="hidden" onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach((file) => onAddResource(file));
                e.target.value = "";
              }} />
              <div className="border-2 border-dashed border-emerald-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400" onClick={() => document.getElementById("resource-files")?.click()} onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                files.forEach((file) => onAddResource(file));
              }} onDragOver={(e) => e.preventDefault()}>
                <Upload className="h-8 w-8 text-emerald-400 mb-2" />
                <span className="text-emerald-600 font-medium">Haz clic o arrastra archivos para añadir</span>
                <span className="text-xs text-muted-foreground mt-1">Puedes añadir varios archivos a la vez</span>
              </div>
              <div className={`border border-${color}-100 rounded-md p-4 mt-4`}>
                <h4 className="font-medium mb-2">Recursos añadidos</h4>
                {resources.length > 0 ? (
                  <div className="space-y-2">
                    {resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-2">{getResourceIcon(resource.type)}<span>{resource.name}</span></div>
                        <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-800 hover:bg-red-100" onClick={() => setResources(resources.filter(r => r.id !== resource.id))}>
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No hay recursos añadidos todavía</p>}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack}><ChevronLeft className="mr-2 h-4 w-4" />Atrás</Button>
          ) : (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancelar</Button>
          )}
          {currentStep === 1 ? (
            <Button className={`bg-${color}-600 hover:bg-${color}-700`} onClick={handleNext}>Siguiente<ChevronRight className="ml-2 h-4 w-4" /></Button>
          ) : (
            <Button className={`bg-${color}-600 hover:bg-${color}-700`} onClick={handleFinish}>Finalizar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
