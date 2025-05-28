import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { ContentTab } from "@/modules/courses/components/course-edit/tabs/content-tab"

describe("ContentTab", () => {
  const mockModule = {
    id: "mod1",
    title: "Module 1",
    lessons: [
      {
        id: "l1",
        title: "Lesson 1",
        type: "video",
        duration: "10m",
        resources: [],
      },
    ],
  }
  const onAddModule = jest.fn()
  const onAddContent = jest.fn()
  const onEditLesson = jest.fn()
  const onEditAssignment = jest.fn()
  const onEditModule = jest.fn()
  const onDeleteModule = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders module title and buttons", () => {
    render(
      <ContentTab
        modules={[mockModule]}
        onAddModule={onAddModule}
        onAddContent={onAddContent}
        onEditLesson={onEditLesson}
        onEditAssignment={onEditAssignment}
        onEditModule={onEditModule}
        onDeleteModule={onDeleteModule}
      />
    )
    expect(screen.getByText(/Estructura del curso/i)).toBeInTheDocument()
    expect(screen.getByText(/Module 1/i)).toBeInTheDocument()
  })

  it("calls onAddModule when add module button clicked", () => {
    render(
      <ContentTab
        modules={[]}
        onAddModule={onAddModule}
        onAddContent={onAddContent}
        onEditLesson={onEditLesson}
        onEditAssignment={onEditAssignment}
        onEditModule={onEditModule}
        onDeleteModule={onDeleteModule}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: /Añadir módulo/i }))
    expect(onAddModule).toHaveBeenCalled()
  })

  it("calls onAddContent when add content button clicked", () => {
    render(
      <ContentTab
        modules={[mockModule]}
        onAddModule={onAddModule}
        onAddContent={onAddContent}
        onEditLesson={onEditLesson}
        onEditAssignment={onEditAssignment}
        onEditModule={onEditModule}
        onDeleteModule={onDeleteModule}
      />
    )
    // Open module accordion to reveal add content button
    fireEvent.click(screen.getByRole("button", { name: /Module 1/i }))
    fireEvent.click(screen.getByRole("button", { name: /Añadir contenido/i }))
    expect(onAddContent).toHaveBeenCalledWith("mod1")
  })
})
