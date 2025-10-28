import { getSlotPorId } from "../../services/slots/getSlotPorId";
import { crearReserva } from "../../services/reservas/crearReserva";
import { validarCupoDisponible } from "../../lib/validarCupoDisponible";
import { validarReservaDuplicada } from "../../lib/validarReservaDuplicada";

export default async function handler(req, res) {
  const { participante, horarioId } = req.body;

  const horario = await getSlotPorId(horarioId);

  if (!validarCupoDisponible(horario)) {
    return res.status(400).json({ error: "Sin cupo disponible" });
  }

  if (validarReservaDuplicada(participante, horario)) {
    return res.status(400).json({ error: "Reserva duplicada" });
  }

  const nuevaReserva = {
    title: `${participante} – ${horario.title}`,
    participante,
    circuito: horario.circuito,
    fecha: horario.fecha,
    estado: "Pendiente",
    horario: horario.title,
    coordinador: horario.coordinador
  };

  const response = await crearReserva(nuevaReserva);
  res.status(200).json({ ok: true, reserva: response });
}
