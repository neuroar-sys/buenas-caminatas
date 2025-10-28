import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    console.warn('❌ ID de slot no proporcionado');
    return res.status(400).json({ success: false, message: 'Falta ID de slot' });
  }

  try {
    console.log('🔍 Consultando slot con ID:', id);

    const slotPage = await notion.pages.retrieve({ page_id: id });
    const slotProps = slotPage.properties;

    console.log('✅ Slot recuperado');
    console.log('📦 Propiedades disponibles:', Object.keys(slotProps));

    // Extraer circuito
    const circuito = slotProps.NombreCircuito?.select?.name || '';
    const cupoMaximo = slotProps.Cupo?.number || 0;

    console.log('🎯 Circuito:', circuito);
    console.log('🔢 Cupo máximo:', cupoMaximo);

    // Consultar reservas activas o confirmadas
    const reservasResponse = await notion.databases.query({
      database_id: process.env.DATABASE_RESERVAS_ID!,
      filter: {
        and: [
          {
            property: 'Slot reservado', // ← corregido aquí
            relation: { contains: id },
          },
          {
            property: 'Estado',
            select: {
              does_not_equal: 'Cancelada',
            },
          },
        ],
      },
    });

    const reservasActivas = reservasResponse.results.length;
    const cupoRestante = cupoMaximo - reservasActivas;
    const alerta = cupoRestante <= 3;

    console.log('📋 Reservas activas:', reservasActivas);
    console.log('🧮 Cupo restante:', cupoRestante);
    console.log('⚠️ Alerta de cupo bajo:', alerta);

    return res.status(200).json({
      success: true,
      circuito,
      cupoMaximo,
      cupoRestante,
      alerta,
    });
  } catch (error: any) {
    console.error('❌ Error al obtener info del slot:', error.message || error);
    return res.status(500).json({ success: false, message: 'Error al obtener info del slot' });
  }
}
