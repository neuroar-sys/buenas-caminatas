import { useEffect, useState } from 'react';

type Slot = {
  id: string;
  fecha: string;
  hora: string;
  cupoMaximo: number;
  cupoRestante: number;
  linkPago: string;
  nombreCircuito: string;
  estadoPublicado: boolean;
};

export default function PanelSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'publicados' | 'no-publicados'>('todos');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const res = await fetch('/api/slots');
        const data = await res.json();
        if (data.success) {
          setSlots(data.slots);
        } else {
          console.error('Error desde API:', data.error);
        }
      } catch (error) {
        console.error('Error al llamar a /api/slots:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, []);

  const slotsFiltrados = slots.filter((slot) => {
    const cumpleEstado =
      filtroEstado === 'todos'
        ? true
        : filtroEstado === 'publicados'
        ? slot.estadoPublicado
        : !slot.estadoPublicado;

    const cumpleFecha = filtroFecha
      ? new Date(slot.fecha) >= new Date(filtroFecha)
      : true;

    return cumpleEstado && cumpleFecha;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Slots</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          Estado:{' '}
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as typeof filtroEstado)}
          >
            <option value="todos">Todos</option>
            <option value="publicados">Solo publicados</option>
            <option value="no-publicados">Solo no publicados</option>
          </select>
        </label>

        <label>
          Desde fecha:{' '}
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <p>Cargando slots...</p>
      ) : slotsFiltrados.length === 0 ? (
        <p>No se encontraron slots con ese filtro.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Circuito</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cupo</th>
              <th>Publicado</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {slotsFiltrados.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.nombreCircuito}</td>
                <td>{slot.fecha}</td>
                <td>{slot.hora}</td>
                <td>
                  {slot.cupoRestante} / {slot.cupoMaximo}
                </td>
                <td>{slot.estadoPublicado ? '✅' : '❌'}</td>
                <td>
                  <a href={slot.linkPago} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
