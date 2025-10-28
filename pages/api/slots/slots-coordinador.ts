import { getCoordinadorPorEmail } from "../../services/coordinadores/getCoordinadorPorEmail";
import { getSlotsPorCoordinadorId } from "../../services/slots/getSlotsPorCoordinadorId";

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email inválido" });
  }

  try {
    const coordinadorId = await getCoordinadorPorEmail(email);
    if (!coordinadorId) {
      return res.status(404).json({ error: "Coordinador no encontrado" });
    }

    const slots = await getSlotsPorCoordinadorId(coordinadorId);
    res.status(200).json(slots);
  } catch (error) {
    console.error("❌ Error al consultar Notion:", error);
    res.status(500).json({ error: "Falló la conexión con Notion" });
  }
}
