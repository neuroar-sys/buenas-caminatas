import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slotId } = req.query;

  if (!slotId || typeof slotId !== 'string') {
    return res.status(400).json({ success: false, message: 'Falta slotId' });
  }

  try {
    const page = await notion.pages.retrieve({ page_id: slotId });
    const props = page.properties;

    const slot = {
      localidad: props.Localidad?.title?.[0]?.plain_text || '', // ✅ campo tipo title
      circuito: props.NombreCircuito?.select?.name || '',       // ✅ campo tipo select
      fecha: props.Fecha?.date?.start || '',
      hora: props.Hora?.rich_text?.[0]?.plain_text || '',
      cupo: props.Cupo?.number ?? null,
      coordinador: props.Coordinador?.people?.[0]?.name || '',
      reservas: props.Reservas?.rollup?.array?.length ?? 0,
    };

    return res.status(200).json({ success: true, slot });
  } catch (error: any) {
    console.error('Error al obtener slot:', error.message || error);
    return res.status(500).json({ success: false, message: 'Error al obtener slot' });
  }
}
