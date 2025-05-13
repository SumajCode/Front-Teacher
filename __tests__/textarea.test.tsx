import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Textarea } from "../src/components/ui/textarea"

describe("Textarea component", () => {
  it("renders with default props", () => {
    render(<Textarea placeholder="Enter text" />)
    const textarea = screen.getByPlaceholderText("Enter text")
    expect(textarea).toBeInTheDocument()
    // default rows attribute
    expect(textarea).toHaveAttribute("rows", "3")
  })

  it("accepts provided rows prop", () => {
    render(<Textarea placeholder="Desc" rows={5} />)
    const textarea = screen.getByPlaceholderText("Desc")
    expect(textarea).toHaveAttribute("rows", "5")
  })

  it("applies additional className", () => {
    render(<Textarea placeholder="Test" className="custom-class" />)
    const textarea = screen.getByPlaceholderText("Test")
    expect(textarea).toHaveClass("custom-class")
  })

  it("calls onChange handler", async () => {
    const onChange = jest.fn()
    render(<Textarea placeholder="Change" onChange={onChange} />)
    const textarea = screen.getByPlaceholderText("Change")
    await userEvent.type(textarea, "abc")
    expect(onChange).toHaveBeenCalled()
  })
})
