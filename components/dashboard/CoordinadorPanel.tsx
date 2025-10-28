import { useEffect, useState } from 'react';
import ParticipantesSlot from '@/components/ParticipantesSlot';


type Slot = {
  id: string;
  fecha: string;
  hora: string;
  localidad: string;
  circuito: string;
  cupo: number;
  reservas: string[];
};

export default function CoordinadorPanel({ coordinadorId }: { coordinadorId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [filtros, setFiltros] = useState({ circuito: '', localidad: '', desde: '', hasta: '' });
  const [slotExpandido, setSlotExpandido] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('coordinadorId', coordinadorId);
    if (filtros.circuito) params.append('circuito', filtros.circuito);
    if (filtros.localidad) params.append('localidad', filtros.localidad);
    if (filtros.desde) params.append('desde', filtros.desde);
    if (filtros.hasta) params.append('hasta', filtros.hasta);

    fetch(`/api/slots-coordinador?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setSlots(data.slots);
      });
  }, [coordinadorId, filtros]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mis circuitos coordinados</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Circuito"
          value={filtros.circuito}
          onChange={e => setFiltros({ ...filtros, circuito: e.target.value })}
          className="border p-2 rounded w-48"
        />
        <input
          type="text"
          placeholder="Localidad"
          value={filtros.localidad}
          onChange={e => setFiltros({ ...filtros, localidad: e.target.value })}
          className="border p-2 rounded w-48"
        />
        <input
          type="date"
          value={filtros.desde}
          onChange={e => setFiltros({ ...filtros, desde: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={filtros.hasta}
          onChange={e => setFiltros({ ...filtros, hasta: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {/* Lista de slots */}
      {slots.map((s) => {
        const cupoRestante = s.cupo - s.reservas.length;
        const expandido = slotExpandido === s.id;

        return (
          <div key={s.id} className="border p-4 mb-4 rounded bg-white shadow-sm">
            <p><strong>Fecha:</strong> {new Date(s.fecha).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {s.hora}</p>
            <p><strong>Localidad:</strong> {s.localidad}</p>
            <p><strong>Circuito:</strong> {s.circuito}</p>
            <p><strong>Cupo restante:</strong> {cupoRestante} / {s.cupo}</p>

            <button
              onClick={() => setSlotExpandido(expandido ? null : s.id)}
              className="mt-3 text-blue-600 underline"
            >
              {expandido ? 'Ocultar participantes' : 'Ver participantes'}
            </button>

            {expandido && (
              <div className="mt-4">
                <ParticipantesSlot slotId={s.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
