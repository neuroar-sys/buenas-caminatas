import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Falta el email' });
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_EQUIPO_ID!,
      filter: {
        property: 'Email',
        email: { equals: email },
      },
    });

    if (response.results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const page = response.results[0];
    const props = page.properties;

    const rol = props.Rol?.select?.name || 'sin rol';
    const nombre = props.Nombre?.title?.[0]?.plain_text || 'Sin nombre';
    const userId = page.id;

    res.status(200).json({ rol, nombre, userId });
  } catch (error: any) {
    console.error('Error al consultar rol:', error.message);
    res.status(500).json({ error: 'Error al consultar Notion' });
  }
}
