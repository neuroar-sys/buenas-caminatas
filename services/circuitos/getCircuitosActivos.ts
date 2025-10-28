// services/circuitos/getCircuitosActivos.ts
import { notion } from "../../lib/notion";
import { Circuito } from "../../models/Circuito";

export async function getCircuitosActivos(): Promise<Circuito[]> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_CIRCUITOS_ID!,
    filter: {
      property: "estado",
      select: { equals: "Activo" }
    }
  });

  return response.results.map((page: any) => ({
    title: page.properties.title?.title?.[0]?.plain_text ?? "",
    zona: page.properties.zona?.select?.name ?? "",
    coordinador: page.properties.coordinador?.select?.name ?? ""
  }));
}
