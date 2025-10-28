// pages/api/opciones-reserva.ts
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dbHorarios = process.env.DATABASE_HORARIOS_ID!;
    const dbCoordinadores = process.env.DATABASE_COORDINADORES_ID!;
    const dbParticipantes = process.env.DATABASE_PARTICIPANTES_ID!;

    const [horariosRes, coordinadoresRes, participantesRes] = await Promise.all([
      notion.databases.query({ database_id: dbHorarios }),
      notion.databases.query({ database_id: dbCoordinadores }),
      notion.databases.query({ database_id: dbParticipantes }),
    ]);

    const horarios = horariosRes.results
      .map((page: any) => {
        const nombre = page.properties.title?.title?.[0]?.plain_text?.trim();
        const circuitoId = page.properties.circuito?.relation?.[0]?.id;
        if (!nombre || !circuitoId) return null;
        return { nombre, circuitoId };
      })
      .filter(Boolean);

    const coordinadores = coordinadoresRes.results
      .map((page: any) => {
        const nombre = page.properties.nombre?.title?.[0]?.plain_text?.trim();
        return nombre ? { label: nombre, value: nombre } : null;
      })
      .filter(Boolean);

    const participantes = participantesRes.results
      .map((page: any) => {
        const nombre = page.properties.nombre?.title?.[0]?.plain_text?.trim();
        return nombre ? { label: nombre, value: nombre } : null;
      })
      .filter(Boolean);

    res.status(200).json({ horarios, coordinadores, participantes });
  } catch (error) {
    console.error("❌ Error en /api/opciones-reserva:", error);
    res.status(500).json({ error: "Error al cargar opciones de reserva" });
  }
}
