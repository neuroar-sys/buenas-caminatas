import type { NextApiRequest, NextApiResponse } from "next";
import { Coordinador } from "../../models/Coordinador";

const coordinadores: Coordinador[] = [
  {
    title: "Sofia Martinez",
    email: "sofia.martinez@email.com",
    estado: "Activo",
    circuitos_asignados: ["Caballito", "Palermo"],
    reservas_gestionadas: ["Luciana Costa – Palermo – 29/10"]
  },
  {
    title: "Martin Rios",
    email: "martin.rios@email.com",
    estado: "Activo",
    circuitos_asignados: ["Almagro", "Belgrano"],
    reservas_gestionadas: ["Julieta Sosa – Villa Crespo – 01/11"]
  },
  // ...otros coordinadores
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(coordinadores);
}
