// services/slots/getHorariosDisponibles.ts
import { notion } from "../../lib/notion";

export async function getHorariosDisponibles(): Promise<number> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_HORARIOS_ID!,
    filter: {
      property: "cupo_maximo",
      number: { greater_than: 0 }
    }
  });

  return response.results.length;
}
