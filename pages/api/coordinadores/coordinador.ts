import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { userId } = req.body;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Falta el userId' });
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_COORDINADORES_ID!,
      filter: {
        property: 'Miembro',
        relation: { contains: userId },
      },
    });

    if (response.results.length === 0) {
      return res.status(404).json({ error: 'Coordinador no encontrado' });
    }

    const page = response.results[0];
    const props = page.properties;

    const coordinadorId = page.id;
    const nombre = props.Nombre?.title?.[0]?.plain_text || 'Sin nombre';
    const activo = props.Activo?.checkbox || false;
    const zona = props['Zona asignada']?.select?.name || 'Sin zona';

    res.status(200).json({ coordinadorId, nombre, activo, zona });
  } catch (error: any) {
    console.error('Error al consultar coordinador:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
