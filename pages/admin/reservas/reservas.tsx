import { useEffect, useState } from 'react';

type Reserva = {
  id: string;
  nombre: string;
  slot: string;
  confirmado: boolean;
  fechaReserva: string;
};

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/api/mis-reservas?email=alesi@email.com')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReservas(data.reservas);
        } else {
          setMensaje('No se pudieron cargar tus reservas.');
        }
      })
      .catch(() => {
        setMensaje('Error de conexión al cargar reservas.');
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis reservas</h1>

      {mensaje && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
          {mensaje}
        </div>
      )}

      {reservas.length === 0 ? (
        <p>No tenés reservas activas.</p>
      ) : (
        reservas.map((r) => (
          <div key={r.id} className="border p-4 mb-4 rounded shadow bg-gray-50">
            <p><strong>Nombre:</strong> {r.nombre}</p>
            <p><strong>Slot reservado:</strong> {r.slot}</p>
            <p><strong>Fecha de reserva:</strong> {new Date(r.fechaReserva).toLocaleDateString()}</p>
            <p><strong>Confirmado:</strong> {r.confirmado ? 'Sí' : 'No'}</p>
          </div>
        ))
      )}
    </div>
  );
}
