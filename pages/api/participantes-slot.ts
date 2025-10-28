import { getReservasPorSlotId } from "../../services/reservas/getReservasPorSlotId";

export default async function handler(req, res) {
  const { slotId } = req.query;

  if (!slotId || typeof slotId !== "string") {
    return res.status(400).json({ error: "Slot ID inválido" });
  }

  try {
    const participantes = await getReservasPorSlotId(slotId);
    res.status(200).json(participantes);
  } catch (error) {
    console.error("❌ Error al consultar reservas:", error);
    res.status(500).json({ error: "Falló la conexión con Notion" });
  }
}
