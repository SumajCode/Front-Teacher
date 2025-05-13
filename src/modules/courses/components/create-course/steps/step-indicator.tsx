interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep >= index + 1
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  currentStep >= index + 2
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>
          Información
        </span>
        <span className={currentStep >= 2 ? "text-indigo-600 font-medium" : ""}>
          Imagen
        </span>
      </div>
    </div>
  )
}
