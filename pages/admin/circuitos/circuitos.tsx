import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { protegerRutaAdmin } from '@/lib/protegerRutaAdmin';

export default function AdminCircuitos() {
  protegerRutaAdmin();
  const router = useRouter();
  const [circuitos, setCircuitos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/circuitos');
      const data = await res.json();
      setCircuitos(data.circuitos || []);
    }
    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧭 Panel de circuitos</h1>
      <ul className="space-y-4">
        {circuitos.map((c) => (
          <li key={c.id} className="border p-4 rounded">
            <p>📍 {c.nombre}</p>
            <p>🧭 Zona: {c.zona}</p>
            <p>📏 Distancia: {c.distancia}</p>
            <button
              onClick={() => router.push(`/admin/circuitos/editar/${c.id}`)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
