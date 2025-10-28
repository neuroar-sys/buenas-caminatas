import { useState } from "react";

export default function CancelarReservaButton({ title, estado }: { title: string; estado: string }) {
  const [mensaje, setMensaje] = useState("");

  const handleCancelar = async () => {
    if (estado === "Cancelada") {
      setMensaje("La reserva ya está cancelada.");
      return;
    }
    if (estado === "Finalizada") {
      setMensaje("No se puede cancelar una reserva ya finalizada.");
      return;
    }

    const res = await fetch("/api/cancelar-reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    if (res.ok) {
      const data = await res.json();
      setMensaje(`Reserva cancelada: ${data.reserva.title}`);
    } else {
      setMensaje("Error al cancelar la reserva.");
    }
  };

  return (
    <div>
      <button onClick={handleCancelar}>Cancelar reserva</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
