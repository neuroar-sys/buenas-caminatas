import { useEffect, useState } from "react";
import Link from "next/link";


type Circuito = {
  id: string;
  nombre: string;
  zona: string;
  localidad: string;
  distancia_m: number;
  foto: string | null;
};

export default function Circuitos() {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("/api/circuitos");
        const data = await res.json();
        if (res.ok) {
          setCircuitos(data);
        } else {
          setError(data.error || "Error desconocido");
        }
      } catch {
        setError("Falló la conexión con el servidor");
      }
    }
    cargar();
  }, []);

  return (
    <main style={{ padding: "2rem", background: "#f9f9f9" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>🌿 Circuitos disponibles</h1>
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {circuitos.length === 0 && !error ? (
        <p>No hay circuitos cargados.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem"
        }}>
          {circuitos.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
              }}
            >
              {c.foto && (
                <img
                  src={c.foto}
                  alt={`Foto de ${c.nombre}`}
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "0.5rem" }}
                />
              )}
              <h3 style={{ marginBottom: "0.5rem" }}>{c.nombre}</h3>
              <p><strong>🗺 Zona:</strong> {c.zona}</p>
              <p><strong>📍 Localidad:</strong> {c.localidad}</p>
              <p><strong>📏 Distancia:</strong> {c.distancia_m} metros</p>
            <Link
  href={{
    pathname: `/reservar/${c.id}`,
    query: { nombre: c.nombre, zona: c.zona }
  }}
>
  <button>Reservar</button>
</Link>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
