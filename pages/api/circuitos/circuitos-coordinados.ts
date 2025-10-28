import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { coordinadorId } = req.query;

  if (!coordinadorId || typeof coordinadorId !== 'string') {
    return res.status(400).json({ error: 'Falta el coordinadorId' });
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID!,
      filter: {
        property: 'Coordinadores',
        relation: { contains: coordinadorId },
      },
    });

    const circuitos = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        nombre: props.Nombre?.title?.[0]?.plain_text || 'Sin nombre',
        zona: props.Zona?.select?.name || 'Sin zona',
      };
    });

    res.status(200).json({ circuitos });
  } catch (error: any) {
    console.error('Error al consultar circuitos:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
