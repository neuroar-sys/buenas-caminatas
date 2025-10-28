import { useEffect, useState } from 'react';
import { protegerRutaAdmin } from '@/lib/protegerRutaAdmin';

type Slot = {
  id: string;
  fecha: string;
  hora: string;
  circuitoId: string;
};

type Circuito = {
  id: string;
  nombre: string;
  zona: string;
};

export default function SlotsCoordinados() {
  protegerRutaAdmin();
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const coordinador = typeof window !== 'undefined' ? localStorage.getItem('coordinador') : null;

  useEffect(() => {
    async function fetchCircuitos() {
      const res = await fetch(`/api/circuitos-coordinados?coordinador=${coordinador}`);
      const data = await res.json();
      setCircuitos(data.circuitos || []);
    }
    if (coordinador) fetchCircuitos();
  }, [coordinador]);

  useEffect(() => {
    async function fetchSlots() {
      const res = await fetch('/api/slots');
      const data = await res.json();
      setSlots(data.slots || []);
    }
    fetchSlots();
  }, []);

  const circuitoMap = Object.fromEntries(circuitos.map((c) => [c.id, c]));

  const slotsFiltrados = slots.filter((s) => circuitoMap[s.circuitoId]);

  const agrupados = slotsFiltrados.reduce((acc: Record<string, Slot[]>, slot) => {
    acc[slot.circuitoId] = acc[slot.circuitoId] || [];
    acc[slot.circuitoId].push(slot);
    return acc;
  }, {});

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🗓️ Slots coordinados</h1>
      {Object.keys(agrupados).length === 0 ? (
        <p className="text-gray-500 italic">No hay slots asignados a tus circuitos.</p>
      ) : (
        Object.entries(agrupados).map(([circuitoId, slots]) => {
          const circuito = circuitoMap[circuitoId];
          return (
            <div key={circuitoId} className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                📍 {circuito.nombre} — 🧭 {circuito.zona}
              </h2>
              <ul className="space-y-2">
                {slots.map((slot) => (
                  <li key={slot.id} className="text-sm text-gray-700">
                    🕒 {slot.fecha} — {slot.hora}
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </main>
  );
}
