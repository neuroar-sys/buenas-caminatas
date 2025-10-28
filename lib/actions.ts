export async function createReserva(reserva: any) {
  const res = await fetch("/api/crear-reserva", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva)
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Error del servidor:", error);
    throw new Error("Error al crear la reserva");
  }

  return await res.json();
}
