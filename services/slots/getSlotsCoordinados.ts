import { notion } from "../../lib/notion";
import { Horario } from "../../models/Horario";

export async function getSlotsCoordinados(email: string): Promise<Horario[]> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_HORARIOS_ID!,
    filter: {
      property: "coordinador",
      select: { equals: email }
    }
  });

  const horarios: Horario[] = response.results.map((page: any) => {
    const props = page.properties;

    return {
      id: page.id,
      title: props.title?.title?.[0]?.plain_text ?? "",
      fecha: props.fecha?.date?.start ?? "",
      circuito: props.circuito?.select?.name ?? "",
      cupo_maximo: props.cupo_maximo?.number ?? 0,
      coordinador: props.coordinador?.select?.name ?? "",
      reservas: [] // podés completar esto si tenés relación inversa
    };
  });

  return horarios;
}
