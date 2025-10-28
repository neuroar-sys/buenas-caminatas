import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { crearReserva } from "../../../services/reservas/crearReserva";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const resultado = await crearReserva(notion, req.body);

    if (resultado.error) {
      return res.status(400).json(resultado);
    }

    return res.status(200).json({
      ok: true,
      mensaje: resultado.mensaje,
      reservaId: resultado.reservaId
    });
  } catch (error: any) {
    console.error("❌ Error al crear reserva:", error.message || error);
    return res.status(500).json({ error: "Error interno al crear la reserva" });
  }
}
