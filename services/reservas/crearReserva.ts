import { Client } from "@notionhq/client";

type ReservaPayload = {
  circuitoId: string;
  nombre: string;
  email: string;
  horario: string;
  coordinador: string;
  estado: string;
};

export async function crearReserva(notion: Client, datos: ReservaPayload) {
  const { circuitoId, nombre, email, horario, coordinador, estado } = datos;

  if (!circuitoId || !nombre || !email || !horario || !coordinador || !estado) {
    return { error: "Faltan campos obligatorios" };
  }

  try {
    const participanteResponse = await notion.databases.query({
      database_id: process.env.DATABASE_PARTICIPANTES_ID!,
      filter: { property: "email", rich_text: { equals: email } }
    });

    const horarioResponse = await notion.databases.query({
      database_id: process.env.DATABASE_HORARIOS_ID!,
      filter: { property: "title", title: { equals: horario } }
    });

    const coordinadorResponse = await notion.databases.query({
      database_id: process.env.DATABASE_COORDINADORES_ID!,
      filter: { property: "title", title: { equals: coordinador } }
    });

    const participanteId = participanteResponse.results[0]?.id || null;
    const horarioId = horarioResponse.results[0]?.id || null;
    const coordinadorId = coordinadorResponse.results[0]?.id || null;

    if (!participanteId || !horarioId || !coordinadorId) {
      return {
        error: "No se encontraron elementos en Notion",
        faltantes: { participanteId, horarioId, coordinadorId }
      };
    }

    const duplicado = await notion.databases.query({
      database_id: process.env.DATABASE_RESERVAS_ID!,
      filter: {
        and: [
          { property: "email", rich_text: { equals: email } },
          { property: "horario", relation: { contains: horarioId } }
        ]
      }
    });

    if (duplicado.results.length > 0) {
      return { error: "Ya existe una reserva para este participante en ese horario" };
    }

    const propiedades = {
      title: { title: [{ text: { content: `Reserva ${nombre}` } }] },
      email: { rich_text: [{ text: { content: email } }] },
      estado: { select: { name: estado } },
      circuito: {
      relation: [{ id: circuitoId }]},
      horario: { relation: [{ id: horarioId }] },
      coordinador: { relation: [{ id: coordinadorId }] },
      participante: { relation: [{ id: participanteId }] }
    };

    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: process.env.DATABASE_RESERVAS_ID!
      },
      properties: propiedades
    });

    return {
      mensaje: "✅ Reserva creada correctamente",
      reservaId: response.id
    };
  } catch (error: any) {
    console.error("❌ Error al crear reserva:", error.message || error);
    return { error: "Error interno al crear la reserva" };
  }
}
