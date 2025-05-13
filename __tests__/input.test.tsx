import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "../src/components/ui/input"

describe("Input component", () => {
  it("renders with default type", () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "text")
  })

  it("accepts provided type prop", () => {
    render(<Input type="email" placeholder="Email" />)
    const input = screen.getByPlaceholderText("Email")
    expect(input).toHaveAttribute("type", "email")
  })

  it("applies additional className", () => {
    render(<Input placeholder="Test" className="custom-class" />)
    const input = screen.getByPlaceholderText("Test")
    expect(input).toHaveClass("custom-class")
  })

  it("calls onChange handler", async () => {
    const onChange = jest.fn()
    render(<Input placeholder="Change" onChange={onChange} />)
    const input = screen.getByPlaceholderText("Change")
    await userEvent.type(input, "abc")
    expect(onChange).toHaveBeenCalled()
  })
})
