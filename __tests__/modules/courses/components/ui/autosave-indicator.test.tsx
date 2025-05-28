import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { AutosaveIndicator } from "@/modules/courses/components/ui/autosave-indicator"

describe("AutosaveIndicator", () => {
  it("shows saving indicator when isAutosaving is true", () => {
    const { container } = render(
      <AutosaveIndicator
        isAutosaving={true}
        hasAutosavedData={false}
        onReset={() => {}}
      />
    )
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument()
  })

  it("calls onReset when reset button is clicked", () => {
    const onReset = jest.fn()
    render(
      <AutosaveIndicator
        isAutosaving={false}
        hasAutosavedData={true}
        onReset={onReset}
      />
    )
    const buttons = screen.getAllByRole("button")
    const resetButton = buttons.find((btn) =>
      btn.className.includes("text-red-600")
    )!
    fireEvent.click(resetButton)
    expect(onReset).toHaveBeenCalled()
  })
})
