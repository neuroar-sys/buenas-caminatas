import { useEffect, useState } from 'react';
import { getReservasBySlot } from '@/lib/notion';

export default function ReservasPorSlot({ slotId }: { slotId: string }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReservas() {
      if (!slotId) return;
      setLoading(true);
      const data = await getReservasBySlot(slotId);
      setReservas(data);
      setLoading(false);
    }
    fetchReservas();
  }, [slotId]);

  if (!slotId) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">📋 Reservas para este slot</h2>
      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length > 0 ? (
        <ul className="space-y-3">
          {reservas.map((r) => (
            <li key={r.id} className="border p-3 rounded">
              <p><strong>👤 Nombre:</strong> {r.nombre}</p>
              <p><strong>📧 Email:</strong> {r.email}</p>
              <p><strong>📱 Whatsapp:</strong> {r.whatsapp}</p>
              <p><strong>🗓️ Fecha de reserva:</strong> {new Date(r.fechaReserva).toLocaleString('es-AR')}</p>
              <p><strong>✅ Confirmado:</strong> {r.confirmado ? 'Sí' : 'No'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay reservas para este slot.</p>
      )}
    </div>
  );
}
