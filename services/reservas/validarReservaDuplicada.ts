import { notion } from "../../lib/notion";

export async function validarReservaDuplicada(email: string, slotId: string): Promise<boolean> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_RESERVAS_ID!,
    filter: {
      and: [
        {
          property: "usuario",
          rich_text: { equals: email }
        },
        {
          property: "horario",
          relation: { contains: slotId }
        }
      ]
    }
  });

  return response.results.length > 0;
}
