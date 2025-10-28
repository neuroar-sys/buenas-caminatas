import type { NextApiRequest, NextApiResponse } from "next";
import { Participante } from "../../models/Participante";

// Simulación de datos. Reemplazá con tu fuente real (Notion, DB, etc.)
const participantes: Participante[] = [
  { title: "Ana Ruiz", email: "ana.ruiz@email.com", estado: "Confirmado", reservas_realizadas: [] },
  { title: "Pedro Alvarez", email: "pedro.alvarez@email.com", estado: "Pendiente", reservas_realizadas: [] },
  { title: "Luciana Costa", email: "luciana.costa@email.com", estado: "Confirmado", reservas_realizadas: [] },
  // ...otros participantes
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(participantes);
}
