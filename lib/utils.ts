export async function getParticipantes(): Promise<string[]> {
  const res = await fetch("/api/todos-participantes");
  const data = await res.json();
  return data.map((p: { title: string }) => p.title);
}

export async function getCircuitos(): Promise<string[]> {
  const res = await fetch("/api/todos-circuitos");
  const data = await res.json();
  return data.map((c: { title: string }) => c.title);
}

export async function getHorarios(): Promise<string[]> {
  const res = await fetch("/api/todos-horarios");
  const data = await res.json();
  return data.map((h: { title: string }) => h.title);
}

export async function getCoordinadores(): Promise<string[]> {
  const res = await fetch("/api/todos-coordinadores");
  const data = await res.json();
  return data.map((c: { title: string }) => c.title);
}

export async function getTodasLasReservas() {
  const res = await fetch("/api/reservas");
  return await res.json();
}
