const API_BASE = "http://localhost:3000/api-docentes/apidocentes/v1"; // ajusta si usas proxy en Next.js

export async function listarEstudiantesPorMateria(idMateria: number) {
  try {
    const response = await fetch(`${API_BASE}/matricula/listar/materia?id_materia=${idMateria}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los estudiantes");
    }

    const data = await response.json();
    return data.data || []; // por si viene en formato `{ data: [...] }`
  } catch (error) {
    console.error("Error en listarEstudiantesPorMateria:", error);
    throw error;
  }
}
