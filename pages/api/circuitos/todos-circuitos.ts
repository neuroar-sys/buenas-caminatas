import type { NextApiRequest, NextApiResponse } from "next";
import { Circuito } from "../../models/Circuito";

// Simulación de datos. Reemplazá con tu fuente real (Notion, DB, etc.)
const circuitos: Circuito[] = [
  {
    title: "Caballito",
    localidad: "Caballito",
    tipo_de_caminata: "Ruta Verde",
    coordinadores: ["Mariana Lopez", "Esteban Vega"],
    horarios: ["Caballito – 27/10 – 09:00"],
    reservas: ["Ana Ruiz – Caballito – 27/10"]
  },
  {
    title: "San Telmo",
    localidad: "San Telmo",
    tipo_de_caminata: "Sendero del Bosque",
    coordinadores: ["Julian Perez", "Sofia Martinez"],
    horarios: ["San Telmo – 28/10 – 10:00"],
    reservas: ["Pedro Alvarez – San Telmo – 28/10"]
  },
  // ...otros circuitos
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(circuitos);
}
