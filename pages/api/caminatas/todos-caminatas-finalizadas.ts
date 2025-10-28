import type { NextApiRequest, NextApiResponse } from "next";
import { CaminataFinalizada } from "../../models/CaminataFinalizada";

const caminatas: CaminataFinalizada[] = [
  {
    title: "Caballito - 27/10",
    circuito: "Caballito",
    fecha: "27 de octubre de 2025",
    coordinador: "Sofia Martinez",
    participantes: ["Ana Ruiz", "Luciana Costa"],
    observaciones: "Caminata tranquila, clima ideal"
  },
  {
    title: "San Telmo - 28/10",
    circuito: "San Telmo",
    fecha: "28 de octubre de 2025",
    coordinador: "Martin Rios",
    participantes: ["Pedro Alvarez", "Leonardo Funes"],
    observaciones: "Grupo reducido, buena energía"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(caminatas);
}
