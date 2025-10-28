import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { id, nombre, zona, distancia, descripcion, activo } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Falta el ID del circuito' });
  }

  try {
    await notion.pages.update({
      page_id: id,
      properties: {
        Nombre: {
          select: { name: nombre || 'Sin nombre' },
        },
        Zona: {
          title: [{ text: { content: zona || 'Sin zona' } }],
        },
        Distancia: {
          rich_text: [{ text: { content: distancia || '' } }],
        },
        Descripcion: {
          rich_text: [{ text: { content: descripcion || '' } }],
        },
        Activo: {
          checkbox: !!activo,
        },
      },
    });

    res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('Error al actualizar circuito:', error.message);
    res.status(500).json({ error: 'Error al actualizar Notion' });
  }
}
