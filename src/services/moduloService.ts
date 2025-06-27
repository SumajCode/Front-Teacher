const API_URL =
  "https://microservice-content.onrender.com/apicontenido/v1/modulo"

export async function listarModulos() {
  console.log("respuesta modulo all")
  // Obtener los módulos
  const res = await fetch(`${API_URL}/contenido`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const modulos = await res.json()
  console.log("respuesta modulo", { modulos })

  const json = modulos

  return json
}

export async function crearModulo(data: unknown) {
  const res = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, todo: false, filter: {} }),
  })
  return res.json()
}

export async function editarModulo(data: unknown, id: string) {
  const res = await fetch(`${API_URL}/editar`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, todo: false, filter: { _id: id } }),
  })
  return res.json()
}

export async function eliminarModulo(id: string) {
  const res = await fetch(`${API_URL}/eliminar`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: false, filter: { _id: id } }),
  })
  return res.json()
}
