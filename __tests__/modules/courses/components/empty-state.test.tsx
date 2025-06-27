import React from "react"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "@/modules/courses/components/empty-state"

describe("EmptyState", () => {
  it.each([
    ["all", "No se encontraron cursos"],
    ["published", "No hay cursos publicados"],
    ["draft", "No hay borradores"],
    ["archived", "No hay cursos archivados"],
  ])("renders correct content for type '%s'", (type, title) => {
    render(<EmptyState type={type as any} />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
