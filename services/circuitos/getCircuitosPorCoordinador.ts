import { notion } from "../../lib/notion";
import { Circuito } from "../../models/Circuito";

export async function getCircuitosPorCoordinador(email: string): Promise<Circuito[]> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_CIRCUITOS_ID!,
    filter: {
      property: "coordinador",
      select: { equals: email }
    }
  });

  const circuitos: Circuito[] = response.results.map((page: any) => {
    const props = page.properties;

    return {
      title: props.title?.title?.[0]?.plain_text ?? "",
      zona: props.zona?.select?.name ?? "",
      estado: props.estado?.select?.name ?? "",
      coordinador: props.coordinador?.select?.name ?? ""
    };
  });

  return circuitos;
}
