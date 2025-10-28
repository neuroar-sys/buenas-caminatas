import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.DATABASE_CIRCUITOS_ID!,
    });

    const titulo = response.title?.[0]?.plain_text || 'Sin título';
    res.status(200).json({ titulo });
  } catch (error) {
    console.error('❌ Error al conectar con Circuitos:', error);
    res.status(500).json({ error: 'Error al conectar con Notion' });
  }
}
