export async function getResumenDashboard() {
  const circuitos = await fetch("/api/todos-circuitos").then(res => res.json());
  const reservas = await fetch("/api/reservas").then(res => res.json());
  const horarios = await fetch("/api/slots").then(res => res.json());
  const participantes = await fetch("/api/todos-participantes").then(res => res.json());

  return {
    circuitos: circuitos.length,
    reservas: reservas.length,
    horarios: horarios.length,
    participantes: participantes.length
  };
}
