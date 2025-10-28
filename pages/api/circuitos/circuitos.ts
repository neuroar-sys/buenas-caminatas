import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const dbId = process.env.DATABASE_CIRCUITOS_ID;

  if (!dbId) return res.status(500).json({ error: 'ID de base no configurado' });

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: 'Activo',
        checkbox: { equals: true },
      },
    });

    const circuitos = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        nombre: props.Nombre?.select?.name || 'Sin nombre',
        zona: props.Zona?.title?.[0]?.plain_text || 'Sin zona',
        descripcion: props.Descripcion?.rich_text?.[0]?.plain_text || '',
        distancia: props.Distancia?.rich_text?.[0]?.plain_text || 'Sin distancia',
        foto: props.Foto?.files?.[0]?.file?.url || null,
      };
    });

    res.status(200).json({ circuitos });
  } catch (error: any) {
    console.error('Error al consultar circuitos:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
