// src/lib/docenteMock.ts
export interface Docente {
  id: number
  usuario: string
  nombre: string
  apellidos: string
  correo: string
  auth_source: string
  timestamp: number
}

// Valor por defecto si no hay parámetros ni almacenamiento previo
const defaultDocente: Docente = {
  id: 95,
  usuario: "rodri",
  nombre: "rodri",
  apellidos: "",
  correo: "rodri@example.com",
  auth_source: "",
  timestamp: Date.now(),
}

/**
 * Recupera los datos del docente de los parámetros de URL o del localStorage.
 * Si hay id_docente en la URL, actualiza el localStorage con los nuevos datos.
 * En caso contrario, retorna los datos almacenados o el valor por defecto.
 */
export function getDocente(): Docente {
  if (typeof window === "undefined") {
    console.log("getDocente - default (no window):", defaultDocente)
    return defaultDocente
  }
  const params = new URLSearchParams(window.location.search)
  const idParam = params.get("id_docente")
  if (idParam) {
    const data: Docente = {
      id: Number(idParam),
      usuario: params.get("usuario_docente") || "",
      nombre: params.get("nombre_docente") || "",
      apellidos: params.get("apellidos_docente") || "",
      correo: params.get("correo_docente") || "",
      auth_source: params.get("auth_source") || "",
      timestamp: Number(params.get("timestamp")) || Date.now(),
    }
    try {
      localStorage.setItem("docente", JSON.stringify(data))
    } catch {}
    console.log("getDocente - from URL params:", data)
    return data
  }
  try {
    const stored = localStorage.getItem("docente")
    if (stored) {
      const parsed = JSON.parse(stored) as Docente
      console.log("getDocente - from localStorage:", parsed)
      return parsed
    }
  } catch {}
  console.log("getDocente - default fallback:", defaultDocente)
  return defaultDocente
}
// Debug: imprimir docente al cargar el módulo
if (typeof window !== "undefined") {
  const docenteInit = getDocente()
  console.log("Docente inicial:", docenteInit)
}
