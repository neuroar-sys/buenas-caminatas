import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const coordinador = req.query.coordinador as string;
  if (!coordinador) return res.status(400).json({ error: 'Falta el nombre del coordinador' });

  try {
    // 1. Buscar circuitos coordinados
    const circuitosRes = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID!,
      filter: {
        property: 'Coordinador',
        select: { equals: coordinador },
      },
    });

    const circuitoIds = circuitosRes.results.map((c: any) => c.id);

    if (circuitoIds.length === 0) return res.status(200).json({ slots: [] });

    // 2. Buscar slots relacionados con esos circuitos
    const slotsRes = await notion.databases.query({
      database_id: process.env.DATABASE_SLOTS_ID!,
      filter: {
        property: 'Circuito',
        relation: { contains: circuitoIds[0] }, // ❗ Notion solo permite un ID por filtro
      },
    });

    const slots = slotsRes.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        fecha: props.Fecha?.date?.start || '',
        hora: props.Hora?.rich_text?.[0]?.plain_text || '',
        circuitoId: props.Circuito?.relation?.[0]?.id || '',
      };
    });

    res.status(200).json({ slots });
  } catch (error: any) {
    console.error('Error al consultar slots coordinados:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
