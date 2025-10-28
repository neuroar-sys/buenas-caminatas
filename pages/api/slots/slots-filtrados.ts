import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { localidad, circuito } = req.query;

  try {
    const filters: any[] = [];

    if (localidad) {
      filters.push({
        property: 'Localidad',
        title: { equals: String(localidad) },
      });
    }

    if (circuito) {
      filters.push({
        property: 'NombreCircuito',
        select: { equals: String(circuito) }, // ✅ corregido aquí
      });
    }

    const response = await notion.databases.query({
      database_id: process.env.DATABASE_SLOTS_ID!,
      filter: filters.length === 1
        ? filters[0]
        : filters.length > 1
        ? { and: filters }
        : undefined,
    });

    const slots = await Promise.all(
      response.results.map(async (page) => {
        const props = page.properties;

        return {
          id: page.id,
          fecha: props.Fecha?.date?.start || '',
          hora: props.Hora?.rich_text?.[0]?.plain_text || '',
          localidad: props.Localidad?.title?.[0]?.plain_text || '',
          circuito: props.NombreCircuito?.select?.name || '', // ✅ corregido aquí
          cupo: props.Cupo?.number || 0,
          reservas: props.Reservas?.relation?.map((r) => r.id) || [],
        };
      })
    );

    res.status(200).json({ success: true, slots });
  } catch (error) {
    console.error('Error al obtener slots:', error);
    res.status(500).json({ success: false, message: 'Error al obtener slots' });
  }
}
