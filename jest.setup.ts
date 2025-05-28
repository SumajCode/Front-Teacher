import "@testing-library/jest-dom"

// Silenciar advertencias de Radix UI sobre refs en tests
const _consoleError = console.error
console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Function components cannot be given refs")
  ) {
    return
  }
  _consoleError(...args)
}
