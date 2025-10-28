import { useEffect, useState } from "react";

export function ParticipantesSlot({ slotId }: { slotId: string }) {
  const [participantes, setParticipantes] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`/api/participantes-slot?slotId=${slotId}`);
        const data = await res.json();
        if (res.ok) {
          setParticipantes(data);
        } else {
          setError(data.error || "Error desconocido");
        }
      } catch {
        setError("Falló la conexión");
      }
    }

    cargar();
  }, [slotId]);

  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
  if (participantes.length === 0) return <p>No hay reservas.</p>;

  return (
    <ul>
      {participantes.map((p) => (
        <li key={p.id}>
          {p.usuario} – <strong>{p.estado}</strong>
        </li>
      ))}
    </ul>
  );
}
