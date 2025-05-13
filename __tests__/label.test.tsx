import React from "react"
import { render, screen } from "@testing-library/react"
import { Label } from "../src/components/ui/label"

describe("Label component", () => {
  it("renders with children and htmlFor attribute", () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    const label = screen.getByText("Test Label")
    expect(label).toHaveAttribute("for", "test-input")
    expect(label.tagName.toLowerCase()).toBe("label")
  })

  it("applies additional className", () => {
    render(
      <Label htmlFor="id" className="custom-class">
        Label
      </Label>
    )
    const label = screen.getByText("Label")
    expect(label).toHaveClass("custom-class")
  })
})
