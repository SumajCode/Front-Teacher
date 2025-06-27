const API_BASE = "https://microservice-docente.onrender.com/apidocentes/v1";

export async function listarMateriasPorDocente(idDocente: number) {
  const res = await fetch(`${API_BASE}/materia/listar?id=${idDocente}`);
  const data = await res.json();
  return data;
}
export async function crearMateria(data: {
  nombre_materia: string;
  nivel_estudio: string;
  id_docente: number;
}) {
  const res = await fetch(`${API_BASE}/materia/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear materia");
  return res.json();
}
