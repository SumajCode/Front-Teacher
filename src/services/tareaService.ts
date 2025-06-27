const API_URL =
  "https://microservice-content.onrender.com/apicontenido/v1/archivo"

export async function crearTarea(data: unknown) {
  const res = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      data
    ),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error del servidor: ${res.status} - ${errorText}`)
  }

  return await res.json()
}
