import { useEffect, useState } from "react";
import { getCoordinadorActual, getCircuitosCoordinados, getReservasGestionadas } from "../api/utils";

export default function Coordinador() {
  const [circuitos, setCircuitos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const coordinador = getCoordinadorActual(); // Ej. "Sofia Martinez"

  useEffect(() => {
    async function cargarDatos() {
      const c = await getCircuitosCoordinados(coordinador);
      const r = await getReservasGestionadas(coordinador);
      setCircuitos(c);
      setReservas(r);
    }
    cargarDatos();
  }, [coordinador]);

  return (
    <div>
      <h2>Panel de Coordinador: {coordinador}</h2>
      <h3>Circuitos asignados</h3>
      <ul>{circuitos.map((c, i) => <li key={i}>{c}</li>)}</ul>
      <h3>Reservas gestionadas</h3>
      <ul>{reservas.map((r, i) => <li key={i}>{r.title} – {r.estado}</li>)}</ul>
    </div>
  );
}
