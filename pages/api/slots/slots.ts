import type { NextApiRequest, NextApiResponse } from "next";
import { Horario } from "../../models/Horario";

const horarios: Horario[] = [
  {
    title: "Caballito – 27/10 – 09:00",
    circuito: "Caballito",
    fecha: "27 de octubre de 2025",
    hora: "09:00",
    cupo_maximo: 10,
    reservas: ["Ana Ruiz – Caballito – 27/10"]
  },
  {
    title: "San Telmo – 28/10 – 10:00",
    circuito: "San Telmo",
    fecha: "28 de octubre de 2025",
    hora: "10:00",
    cupo_maximo: 12,
    reservas: ["Pedro Alvarez – San Telmo – 28/10"]
  },
  // ...otros horarios
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(horarios);
}
