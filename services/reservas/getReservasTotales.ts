// services/reservas/getReservasTotales.ts
import { notion } from "../../lib/notion";

export async function getReservasTotales(): Promise<number> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_RESERVAS_ID!
  });

  return response.results.length;
}
