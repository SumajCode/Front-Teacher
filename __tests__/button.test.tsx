import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "../src/components/ui/button"

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByText("Click"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("applies variant and size classes", () => {
    const { container } = render(
      <Button variant="destructive" size="lg">
        Remove
      </Button>
    )
    expect(container.firstChild).toHaveClass("bg-destructive")
    expect(container.firstChild).toHaveClass("h-10")
  })
})
