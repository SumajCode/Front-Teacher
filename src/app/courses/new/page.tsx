'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function NewCoursePage() {
  const [step, setStep] = useState(1)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Crear nuevo curso</h1>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                1
              </div>
              <div className={`h-1 w-12 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                2
              </div>
              <div className={`h-1 w-12 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                3
              </div>
              <div className={`h-1 w-12 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                4
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Información
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Categorización
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Imagen
            </span>
            <span className={step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Precios
            </span>
          </div>
        </div>

        {step === 1 && (
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardTitle className="text-blue-800">Información básica</CardTitle>
              <CardDescription>Comienza con la información básica de tu curso</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Título del curso *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Desarrollo Web Completo"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subtitle">Subtítulo *</Label>
                  <Input
                    id="subtitle"
                    placeholder="Ej: Aprende HTML, CSS, JavaScript, PHP y más"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu curso..."
                    className="min-h-[150px] border-blue-200 focus-visible:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="language">Idioma principal *</Label>
                  <Select>
                    <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="fr">Francés</SelectItem>
                      <SelectItem value="de">Alemán</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-gray-50">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
                Continuar
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardTitle className="text-blue-800">Categorización</CardTitle>
              <CardDescription>Ayuda a los estudiantes a encontrar tu curso</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select>
                    <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Desarrollo Web</SelectItem>
                      <SelectItem value="mobile">Desarrollo Móvil</SelectItem>
                      <SelectItem value="design">Diseño</SelectItem>
                      <SelectItem value="business">Negocios</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">Subcategoría</Label>
                  <Select>
                    <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                      <SelectValue placeholder="Selecciona una subcategoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frameworks">Frameworks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="level">Nivel *</Label>
                  <Select>
                    <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                      <SelectValue placeholder="Selecciona un nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                      <SelectItem value="all">Todos los niveles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tags">Etiquetas</Label>
                  <Input
                    id="tags"
                    placeholder="Ej: javascript, react, programación"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                  <p className="text-xs text-muted-foreground">Separa las etiquetas con comas</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50">
              <Button variant="outline" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(3)}>
                Continuar
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardTitle className="text-blue-800">Imagen del curso</CardTitle>
              <CardDescription>Añade una imagen atractiva para tu curso</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="course-image">Imagen de portada *</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-md p-6 bg-blue-50">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="h-10 w-10 text-blue-500" />
                      <p className="text-sm font-medium">Arrastra y suelta una imagen aquí</p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG o JPEG (Recomendado: 1280x720px)
                      </p>
                      <Button
                        variant="outline"
                        className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        Seleccionar archivo
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="promo-video">Video promocional (opcional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="promo-video"
                      type="file"
                      accept="video/*"
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Subir
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50">
              <Button variant="outline" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(4)}>
                Continuar
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardTitle className="text-blue-800">Precios</CardTitle>
              <CardDescription>Establece el precio de tu curso</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="price">Precio (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Ej: 49.99"
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="discount-price">Precio con descuento (USD)</Label>
                  <Input
                    id="discount-price"
                    type="number"
                    placeholder="Ej: 19.99"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="free-course">Curso gratuito</Label>
                    <p className="text-sm text-muted-foreground">
                      Ofrecer este curso de forma gratuita
                    </p>
                  </div>
                  <Switch id="free-course" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="subscription">Incluir en suscripción</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluir este curso en planes de suscripción
                    </p>
                  </div>
                  <Switch id="subscription" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50">
              <Button variant="outline" onClick={() => setStep(3)}>
                Atrás
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/courses">Crear curso</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
