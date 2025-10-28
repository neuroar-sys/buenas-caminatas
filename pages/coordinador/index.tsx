import { useEffect, useState } from 'react';

type Circuito = {
  id: string;
  nombre: string;
  zona: string;
};

export default function PanelCoordinacion() {
  const [nombreUsuario, setNombreUsuario] = useState('Coordinador/a');
  const [coordinadorId, setCoordinadorId] = useState<string | null>(null);
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);

  // 🔹 Cargar datos del usuario desde localStorage (solo en cliente)
  useEffect(() => {
    const nombre = localStorage.getItem('nombre');
    const id = localStorage.getItem('coordinadorId');
    if (nombre) setNombreUsuario(nombre);
    if (id) setCoordinadorId(id);
  }, []);

  // 🔹 Consultar circuitos coordinados por el coordinadorId
  useEffect(() => {
    async function fetchCircuitos() {
      if (!coordinadorId) return;
      try {
        const res = await fetch(`/api/circuitos-coordinados?coordinadorId=${coordinadorId}`);
        const data = await res.json();
        setCircuitos(data.circuitos || []);
      } catch (err) {
        console.error('Error al cargar circuitos:', err);
      }
    }
    fetchCircuitos();
  }, [coordinadorId]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {nombreUsuario} 👋</h1>
      <h2 className="text-xl font-semibold mb-2">Estás en el panel de coordinación</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">Mis circuitos coordinados</h3>
      {circuitos.length === 0 ? (
        <p className="text-gray-500 italic">No tenés circuitos asignados como coordinador.</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">🧭 Localidad</th>
              <th className="p-2">📍 Circuito</th>
              </tr>
          </thead>
          <tbody>
            {circuitos.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.nombre}</td>
                <td className="p-2">{c.zona}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
