import { useEffect, useState } from 'react';

interface SlotInfoProps {
  slotId: string;
  fecha: string;
  hora: string;
  localidad: string;
}

interface InfoSlot {
  circuito: string;
  cupoMaximo: number;
  cupoRestante: number;
  alerta: boolean;
}

export default function SlotInfo({ slotId, fecha, hora, localidad }: SlotInfoProps) {
  const [info, setInfo] = useState<InfoSlot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slotId) return;

    console.log('🔍 Consultando info del slot con ID:', slotId);

    fetch(`/api/info-slot?id=${slotId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Respuesta del endpoint /api/info-slot:', data);

        if (data.success) {
          setInfo({
  circuito: data.circuito, // ← este campo debe estar presente
  cupoMaximo: data.cupoMaximo,
  cupoRestante: data.cupoRestante,
  alerta: data.alerta,
});

        } else {
          console.warn('⚠️ El endpoint devolvió success: false');
        }
      })
      .catch((err) => console.error('❌ Error al cargar info del slot:', err))
      .finally(() => setLoading(false));
  }, [slotId]);

  console.log('📊 Estado actual de info:', info);

  if (loading) return <p>Cargando información del circuito...</p>;
  if (!info) return <p>No se pudo cargar la información del circuito.</p>;
  console.log('📊 Estado actual de info:', info);


  return (
    <div className="border rounded p-4 shadow-sm bg-white space-y-2">
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Localidad:</strong> {localidad}</p>
      <p><strong>Circuito:</strong> {info.circuito || '—'}</p>
      <p><strong>Cupo restante:</strong> {info.cupoRestante} / {info.cupoMaximo}</p>

      {info.alerta && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          ⚠️ ¡Cupo por agotarse! Solo quedan {info.cupoRestante} lugares.
        </div>
      )}

      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Reservar este circuito
      </button>
    </div>
  );
}
