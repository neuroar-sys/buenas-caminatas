import { useEffect, useState } from 'react';
import { obtenerMiembros } from '@/lib/notion';
import { protegerRuta } from '@/lib/protegerRuta';

export default function AdminEquipo() {
  protegerRuta();
  const [miembros, setMiembros] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await obtenerMiembros();
      setMiembros(data);
    }
    fetchData();
  }, []);

  const miembrosFiltrados = miembros.filter((m) =>
    m.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    m.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <main className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Gestión de equipo</h1>
      <input
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar por nombre o email"
        className="block mx-auto mb-6 px-4 py-2 border rounded w-full max-w-md"
      />
      <div className="max-w-3xl mx-auto space-y-4">
        {miembrosFiltrados.map((m) => (
          <div key={m.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{m.nombre}</p>
              <p className="text-sm text-gray-600">{m.email}</p>
              <p className="text-sm text-blue-600">Rol: {m.rol}</p>
            </div>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
              Editar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
