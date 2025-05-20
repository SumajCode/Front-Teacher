import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DetailsTab() {
  return (
    <Card className="border-emerald-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          Detalles del curso
        </CardTitle>
        <CardDescription>Información básica sobre tu curso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Título del curso</Label>
            <Input
              id="title"
              placeholder="Ej: Desarrollo Web Completo"
              defaultValue="Desarrollo Web Completo"
              className="border-emerald-200 focus-visible:ring-emerald-500"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe tu curso..."
              className="min-h-[150px] border-emerald-200 focus-visible:ring-emerald-500"
              defaultValue="En este curso aprenderás desarrollo web desde cero hasta convertirte en un desarrollador full-stack. Cubriremos HTML, CSS, JavaScript, PHP, MySQL y mucho más."
            />
          </div>

          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Guardar cambios
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
