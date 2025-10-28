// lib/notion.ts
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY
});


export async function getCircuitos() {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_CIRCUITOS_ID!,
  });

  return response.results.map((page) => {
    const props = page.properties;

    const fotoFile = props.Foto?.files?.[0];
    const fotoUrl =
      fotoFile?.type === 'external'
        ? fotoFile.external.url
        : fotoFile?.type === 'file'
        ? fotoFile.file.url
        : null;

    return {
      id: page.id,
      nombreCircuito: props.NombreCircuito?.select?.name || '',
      descripcion: props.Descripcion?.rich_text?.[0]?.plain_text || '',
      localidad: props.Localidad?.title?.[0]?.plain_text || '',
      distancia: props.Distancia?.number || null,
      foto: fotoUrl,
    };
  });
}
export async function getRolPorEmail(email: string): Promise<'coordinador' | 'usuario'> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_EQUIPO_ID!,
    filter: {
      and: [
        {
          property: 'Email',
          email: {
            equals: email,
          },
        },
        {
          property: 'Activo',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  const miembro = response.results[0];
  const rol = miembro?.properties?.Rol?.select?.name;

  return rol === 'coordinador' ? 'coordinador' : 'usuario';
}


export async function createReserva({
  nombre,
  email,
  whatsapp,
  slotId,
}: {
  nombre: string;
  email: string;
  whatsapp: string;
  slotId: string;
}) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.DATABASE_RESERVAS_ID! },
      properties: {
        Nombre: { title: [{ text: { content: nombre } }] },
        Email: { email },
        Whatsapp: { phone_number: whatsapp },
        'Slot reservado': { relation: [{ id: slotId }] },
        Confirmado: { checkbox: false },
        'Fecha de reserva': { date: { start: new Date().toISOString() } },
      },
    });

    return response.id;
  } catch (error) {
    console.error('Error creating reserva:', error);
    return null;
  }
}


export async function getReservasByEmail(email: string) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_RESERVAS_ID!,
      filter: {
        property: 'Email',
        email: { equals: email },
      },
      sorts: [{ property: 'Fecha de reserva', direction: 'descending' }],
    });

    const reservas = [];

    for (const page of response.results) {
      const props = page.properties;
      const slotId = props['Slot reservado']?.relation?.[0]?.id || '';

      let circuito = '';
      let fecha = '';
      let hora = '';
      let localidad = '';

      if (slotId) {
        const slotPage = await notion.pages.retrieve({ page_id: slotId });
        const slotProps = slotPage.properties;

        fecha = slotProps.Fecha?.date?.start || '';
        hora = slotProps.Hora?.rich_text?.[0]?.plain_text || '';

        const circuitoId = slotProps['Circuito vinculado']?.relation?.[0]?.id;
        if (circuitoId) {
          const circuitoPage = await notion.pages.retrieve({ page_id: circuitoId });
          const circuitoProps = circuitoPage.properties;

          circuito = circuitoProps.NombreCircuito?.rich_text?.[0]?.plain_text || '';
          localidad = circuitoProps.Localidad?.title?.[0]?.plain_text || '';
        }
      }

      reservas.push({
        id: page.id,
        nombre: props.Nombre?.title?.[0]?.plain_text || '',
        slot: slotId,
        confirmado: props.Confirmado?.checkbox || false,
        fechaReserva: props['Fecha de reserva']?.date?.start || '',
        circuito,
        fecha,
        hora,
        localidad,
      });
    }

    return reservas;
  } catch (error) {
    console.error('Error fetching reservas:', error);
    return [];
  }
}
export async function cancelarReserva(reservaId: string) {
  try {
    await notion.pages.update({
      page_id: reservaId,
      archived: true,
    });
    return true;
  } catch (error) {
    console.error('Error al cancelar reserva:', error);
    return false;
  }
}
export async function getTodasLasReservas() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_RESERVAS_ID!,
      sorts: [{ property: 'Fecha de reserva', direction: 'descending' }],
    });

    // Reutilizá el mismo bloque de enriquecimiento que en getReservasByEmail
    // pero sin filtrar por email
    // Podés extraerlo como función auxiliar si querés modularizar

    // ...
  } catch (error) {
    console.error('Error al obtener todas las reservas:', error);
    return [];
  }
}

export async function getSlotsFiltrados({
  localidad,
  circuito,
}: {
  localidad?: string;
  circuito?: string;
}) {
  const filters = [];

  if (localidad) {
    filters.push({
      property: 'Localidad',
      title: { equals: localidad },
    });
  }

  if (circuito) {
    filters.push({
      property: 'NombreCircuito',
      rich_text: { equals: circuito },
    });
  }

  const response = await notion.databases.query({
    database_id: process.env.DATABASE_SLOTS_ID!,
    filter: filters.length === 1 ? filters[0] : { and: filters },
    sorts: [{ property: 'Fecha', direction: 'ascending' }],
  });

  return response.results;
}
export async function confirmarReserva(reservaId: string): Promise<boolean> {
  try {
    await notion.pages.update({
      page_id: reservaId,
      properties: {
        Estado: {
          select: { name: 'Confirmada' },
        },
      },
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar estado a Confirmada:', error);
    return false;
  }
}
export async function testNotionConnection() {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.DATABASE_EQUIPO_ID!,
    });
    console.log('Conexión exitosa:', response.title);
  } catch (error) {
    console.error('Error al conectar con Notion:', error);
  }
}
export async function obtenerCircuitos(): Promise<
  { id: string; nombre: string; distancia: string; activo: boolean }[]
> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID!,
      filter: {
        property: 'Activo',
        checkbox: { equals: true },
      },
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        nombre: props.Nombre?.title?.[0]?.plain_text || 'Sin nombre',
        distancia: props.Distancia?.rich_text?.[0]?.plain_text || 'Sin distancia',
        activo: props.Activo?.checkbox || false,
      };
    });
  } catch (error) {
    console.error('❌ Error al obtener circuitos:', error);
    return [];
  }
}
export async function obtenerMiembros(): Promise<
  { id: string; nombre: string; email: string; rol: string }[]
> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_EQUIPO_ID!,
      filter: {
        property: 'Activo',
        checkbox: { equals: true },
      },
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        nombre: props.Nombre?.title?.[0]?.plain_text || 'Sin nombre',
        email: props.Email?.email || 'Sin email',
        rol: props.Rol?.select?.name || 'Sin rol',
      };
    });
  } catch (error) {
    console.error('❌ Error al obtener miembros:', error);
    return [];
  }
}
export async function testConexionCircuitos() {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.DATABASE_CIRCUITOS_ID!,
    });

    const titulo = response.title?.[0]?.plain_text || 'Sin título';
    console.log('✅ Conexión exitosa con Circuitos:', titulo);
    return titulo;
  } catch (error) {
    console.error('❌ Error al conectar con Circuitos:', error);
    return null;
  }
}
