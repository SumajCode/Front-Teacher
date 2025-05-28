import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Step1Info } from "@/modules/courses/components/create-course/steps/step1-info"

describe("Step1Info", () => {
  const setTitle = jest.fn()
  const setDescription = jest.fn()

  beforeEach(() => {
    setTitle.mockClear()
    setDescription.mockClear()
  })

  it("renders title and description inputs", () => {
    render(
      <Step1Info
        title="My Title"
        setTitle={setTitle}
        description="My Desc"
        setDescription={setDescription}
      />
    )
    expect(screen.getByLabelText(/Título del curso/i)).toHaveValue("My Title")
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue("My Desc")
  })

  it("calls setTitle and setDescription on change", () => {
    render(
      <Step1Info
        title=""
        setTitle={setTitle}
        description=""
        setDescription={setDescription}
      />
    )
    fireEvent.change(screen.getByLabelText(/Título del curso/i), {
      target: { value: "New Title" },
    })
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "New Desc" },
    })
    expect(setTitle).toHaveBeenCalledWith("New Title")
    expect(setDescription).toHaveBeenCalledWith("New Desc")
  })
})
