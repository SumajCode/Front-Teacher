import type { Course } from "@/modules/courses/types"

export const courses: Course[] = [
  {
    id: "1",
    title: "Desarrollo Web Completo",
    status: "published",
    students: 845,
    rating: 4.8,
    revenue: "$12,234",
    lastUpdated: "2023-10-15",
    description: "Aprende HTML, CSS, JavaScript, PHP y más en este curso completo de desarrollo web.",
    image: "/placeholder.svg?height=150&width=250&text=Desarrollo+Web",
    modules: 12,
    duration: "32h 45m",
    color: "blue",
    archivo: [],
  },
  {
    id: "2",
    title: "JavaScript Moderno",
    status: "published",
    students: 532,
    rating: 4.7,
    revenue: "$8,120",
    lastUpdated: "2023-11-02",
    description: "Domina JavaScript moderno, ES6+, promesas, async/await y más.",
    image: "/placeholder.svg?height=150&width=250&text=JavaScript",
    modules: 8,
    duration: "24h 30m",
    color: "amber",
    archivo: [],
  },
  {
    id: "3",
    title: "React desde Cero",
    status: "published",
    students: 489,
    rating: 4.9,
    revenue: "$7,340",
    lastUpdated: "2023-09-28",
    description: "Aprende React desde cero, hooks, componentes y más.",
    image: "/placeholder.svg?height=150&width=250&text=React",
    modules: 10,
    duration: "28h 10m",
    color: "cyan",
    archivo: [],
  },
  {
    id: "4",
    title: "Python para Principiantes",
    status: "published",
    students: 367,
    rating: 4.6,
    revenue: "$5,890",
    lastUpdated: "2023-12-05",
    description: "Inicia en la programación con Python, desde cero.",
    image: "/placeholder.svg?height=150&width=250&text=Python",
    modules: 7,
    duration: "19h 50m",
    color: "yellow",
    archivo: [],
  },
  {
    id: "5",
    title: "Diseño UX/UI Avanzado",
    status: "draft",
    students: 0,
    rating: 0,
    revenue: "$0",
    lastUpdated: "2024-01-10",
    description: "Aprende técnicas avanzadas de diseño UX/UI.",
    image: "/placeholder.svg?height=150&width=250&text=UX+UI",
    modules: 5,
    duration: "15h 00m",
    color: "pink",
    archivo: [],
  },
  {
    id: "6",
    title: "Introducción a la Programación",
    status: "archived",
    students: 1250,
    rating: 4.2,
    revenue: "$15,300",
    lastUpdated: "2022-05-20",
    description: "Curso básico para aprender lógica y fundamentos de programación.",
    image: "/placeholder.svg?height=150&width=250&text=Intro+Prog",
    modules: 20,
    duration: "40h 00m",
    color: "gray",
    archivo: [],
  },
]
