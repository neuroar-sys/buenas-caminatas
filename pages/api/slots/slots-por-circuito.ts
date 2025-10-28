import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const circuitoId = req.query.id as string;
  if (!circuitoId) return res.status(400).json({ error: 'Falta el id de circuito' });

  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_SLOTS_ID!,
      filter: {
        property: 'Circuito',
        relation: { contains: circuitoId },
      },
    });

    const slots = response.results.map((page: any) => ({
      id: page.id,
      fecha: page.properties.Fecha?.date?.start || '',
      hora: page.properties.Hora?.rich_text?.[0]?.plain_text || '',
      disponible: page.properties.Disponible?.checkbox || false,
    }));

    res.status(200).json({ slots });
  } catch (error: any) {
    console.error('Error al obtener slots:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
