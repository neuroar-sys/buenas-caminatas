// services/usuarios/getParticipantesRegistrados.ts
import { notion } from "../../lib/notion";

export async function getParticipantesRegistrados(): Promise<number> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_PARTICIPANTES_ID!
  });

  return response.results.length;
}
