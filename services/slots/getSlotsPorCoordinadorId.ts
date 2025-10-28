import { notion } from "../../lib/notion";
import { Horario } from "../../models/Horario";
import { getNombreCircuitoPorId } from "../circuitos/getNombreCircuitoPorId";

export async function getSlotsPorCoordinadorId(id: string): Promise<Horario[]> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_HORARIOS_ID!,
    filter: {
      property: "coordinador",
      relation: { contains: id }
    }
  });

  const slots: Horario[] = [];

  for (const page of response.results) {
    const props = page.properties;
    const circuitoId = props.circuito?.relation?.[0]?.id ?? "";
    const nombreCircuito = circuitoId ? await getNombreCircuitoPorId(circuitoId) : "Sin circuito";

    slots.push({
      id: page.id,
      title: props.title?.title?.[0]?.plain_text ?? "",
      fecha: props.fecha?.date?.start ?? "",
      circuito: nombreCircuito,
      cupo_maximo: props.cupo_maximo?.number ?? 0,
      coordinador: props.coordinador?.relation?.[0]?.id ?? "",
      reservas: props.reservas?.relation?.length ?? 0
    });
  }

  return slots;
}
