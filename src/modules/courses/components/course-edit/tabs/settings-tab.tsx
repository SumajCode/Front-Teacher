import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SettingsTab() {
  return (
    <Card className="border-rose-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-rose-600" />
          Configuración
        </CardTitle>
        <CardDescription>Ajustes generales del curso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="status">Estado</Label>
            <Select defaultValue="published">
              <SelectTrigger className="border-rose-200 focus-visible:ring-rose-500">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="archived">Archivado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button className="bg-rose-600 hover:bg-rose-700">
              Guardar cambios
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
