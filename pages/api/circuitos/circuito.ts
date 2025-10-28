import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const circuitoId = req.query.id as string;

  if (!circuitoId) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }

  try {
    const page = await notion.pages.retrieve({ page_id: circuitoId });
    const props = page.properties;

    const circuito = {
      id: page.id,
      nombre: props.Nombre?.select?.name || '',
      zona: props.Zona?.title?.[0]?.plain_text || '',
      distancia: props.Distancia?.rich_text?.[0]?.plain_text || '',
      descripcion: props.Descripcion?.rich_text?.[0]?.plain_text || '',
      activo: props.Activo?.checkbox || false,
    };

    res.status(200).json(circuito);
  } catch (error: any) {
    console.error('Error al obtener circuito:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
