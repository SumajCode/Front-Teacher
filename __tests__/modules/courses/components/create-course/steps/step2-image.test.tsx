import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Step2Image } from "@/modules/courses/components/create-course/steps/step2-image"

describe("Step2Image", () => {
  const setImagePreview = jest.fn()
  const setImageFile = jest.fn()

  beforeEach(() => {
    setImagePreview.mockClear()
    setImageFile.mockClear()
  })

  it("renders upload area when no imagePreview", () => {
    render(
      <Step2Image
        imagePreview={null}
        setImagePreview={setImagePreview}
        setImageFile={setImageFile}
      />
    )
    expect(
      screen.getByText(/Arrastra y suelta una imagen aquí/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Seleccionar archivo/i })
    ).toBeInTheDocument()
  })

  it("calls setImagePreview and setImageFile on file select", async () => {
    render(
      <Step2Image
        imagePreview={null}
        setImagePreview={setImagePreview}
        setImageFile={setImageFile}
      />
    )
    const file = new File(["hello"], "test.png", { type: "image/png" })
    // The label's htmlFor links to the file input, so getByLabelText returns the input
    const input = screen.getByLabelText(/Imagen de portada/i)
    fireEvent.change(input, { target: { files: [file] } })
    await waitFor(() => {
      expect(setImageFile).toHaveBeenCalledWith(file)
      expect(setImagePreview).toHaveBeenCalled()
    })
  })

  it("renders preview and remove button when imagePreview provided and calls reset on click", () => {
    render(
      <Step2Image
        imagePreview="data:image/png;base64,abc"
        setImagePreview={setImagePreview}
        setImageFile={setImageFile}
      />
    )
    expect(screen.getByAltText(/Vista previa/i)).toBeInTheDocument()
    const removeButton = screen.getByRole("button")
    fireEvent.click(removeButton)
    expect(setImageFile).toHaveBeenCalledWith(null)
    expect(setImagePreview).toHaveBeenCalledWith(null)
  })
})
