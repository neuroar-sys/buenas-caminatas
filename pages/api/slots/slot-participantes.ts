import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slotId } = req.query;

  if (!slotId || typeof slotId !== 'string') {
    return res.status(400).json({ success: false, message: 'Falta slotId' });
  }

  try {
    // Buscar reservas activas para ese slot
    const reservasResponse = await notion.databases.query({
      database_id: process.env.DATABASE_RESERVAS_ID!,
      filter: {
        and: [
          {
            property: 'Slot reservado',
            relation: { contains: slotId },
          },
          {
            property: 'Estado',
            select: { does_not_equal: 'Cancelada' },
          },
        ],
      },
    });

    const participantes = await Promise.all(
      reservasResponse.results.map(async (reserva) => {
        const props = reserva.properties;
        const usuarioRelation = props.Usuario?.relation?.[0];

        if (!usuarioRelation) return null;

        const usuarioId = usuarioRelation.id;
        const usuarioPage = await notion.pages.retrieve({ page_id: usuarioId });
        const usuarioProps = usuarioPage.properties;

        const nombre = usuarioProps.Nombre?.title?.[0]?.plain_text || 'Sin nombre';
        const whatsapp = usuarioProps.WhatsApp?.phone_number || usuarioProps.WhatsApp?.rich_text?.[0]?.plain_text || '';

        return { nombre, whatsapp };
      })
    );

    const filtrados = participantes.filter(Boolean);

    res.status(200).json({ success: true, participantes: filtrados });
  } catch (error: any) {
    console.error('❌ Error en /api/slot-participantes:', error.message || error);
    res.status(500).json({ success: false, message: 'Error al obtener participantes' });
  }
}
