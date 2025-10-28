import { useRouter } from "next/router";
import FormularioReservaAvanzado from "../../components/FormularioReservaAvanzado";

export default function Reservar() {
  const router = useRouter();
  const { circuitoId, nombre, zona } = router.query;

  if (!circuitoId || typeof circuitoId !== "string") return <p>Cargando circuito...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Reserva para circuito</h1>
      <p><strong>📍 {nombre}</strong> – {zona}</p>
      <FormularioReservaAvanzado circuitoId={circuitoId} nombre={String(nombre)} zona={String(zona)} />
    </main>
  );
}
