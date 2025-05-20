"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CourseGrid } from "@/modules/courses/components/course-grid"
import { CourseTable } from "@/modules/courses/components/course-table"

import { EmptyState } from "@/modules/courses/components/empty-state"
import { useCourseFilters } from "@/modules/courses/hooks/use-course-filters"
import { courses } from "@/modules/courses/data/courses"
import { Plus, Search } from "lucide-react"
import { CreateCourseDialog } from "@/modules/courses/components/create-course/create-course-dialog"

export function CoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [isCreateCourseDialogOpen, setIsCreateCourseDialogOpen] = useState(false)

  const [currentTab, setCurrentTab] = useState("all")

  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredCourses } = useCourseFilters(courses, currentTab)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mis Cursos
          </h1>
          <p className="text-muted-foreground">Gestiona tus cursos y contenido educativo</p>
        </div>

        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
          onClick={() => setIsCreateCourseDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Crear curso
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md border p-6">
        <Tabs
          defaultValue="all"
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value)}
          className="space-y-6"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <TabsList className="bg-slate-100">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="published"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Publicados
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Borradores
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Archivados
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 ml-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                  <span className="sr-only">Vista de cuadrícula</span>
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="icon"
                  className={viewMode === "table" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setViewMode("table")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  <span className="sr-only">Vista de tabla</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos..."
                  className="pl-8 w-full sm:w-[250px] border-blue-200 focus-visible:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px] border-blue-200 focus-visible:ring-blue-500">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="oldest">Más antiguos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-4 space-y-4">
            {viewMode === "grid" ? <CourseGrid courses={filteredCourses} /> : <CourseTable courses={filteredCourses} />}

            {filteredCourses.length === 0 && <EmptyState type="all" />}
          </TabsContent>

          <TabsContent value="published" className="mt-4 space-y-4">
            {viewMode === "grid" ? (
              <CourseGrid courses={filteredCourses.filter((course) => course.status === "published")} />
            ) : (
              <CourseTable courses={filteredCourses.filter((course) => course.status === "published")} />
            )}

            {filteredCourses.filter((course) => course.status === "published").length === 0 && (
              <EmptyState type="published" />
            )}
          </TabsContent>

          <TabsContent value="draft" className="mt-4 space-y-4">
            {viewMode === "grid" ? (
              <CourseGrid courses={filteredCourses.filter((course) => course.status === "draft")} />
            ) : (
              <CourseTable courses={filteredCourses.filter((course) => course.status === "draft")} />
            )}

            {filteredCourses.filter((course) => course.status === "draft").length === 0 && <EmptyState type="draft" />}
          </TabsContent>
          <TabsContent value="archived" className="mt-4 space-y-4">
            {viewMode === "grid" ? (
              <CourseGrid courses={filteredCourses.filter((course) => course.status === "archived")} />
            ) : (
              <CourseTable courses={filteredCourses.filter((course) => course.status === "archived")} />
            )}

            {filteredCourses.filter((course) => course.status === "archived").length === 0 && (
              <EmptyState type="archived" />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <CreateCourseDialog open={isCreateCourseDialogOpen} onOpenChange={setIsCreateCourseDialogOpen} />
    </div>
  )
}
