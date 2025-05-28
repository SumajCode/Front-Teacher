import React from "react"
import { render, screen } from "@testing-library/react"
import { StepIndicator } from "@/modules/courses/components/create-course/steps/step-indicator"

describe("StepIndicator", () => {
  it("renders steps based on currentStep and totalSteps", () => {
    render(<StepIndicator currentStep={2} totalSteps={3} />)
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.getByText(/Imagen/i)).toBeInTheDocument()
    expect(screen.getByText(/Información/i)).toBeInTheDocument()
  })
})
