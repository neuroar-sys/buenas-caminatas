export async function getParticipanteId(email: string): Promise<string | null> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_PARTICIPANTES_ID!,
    filter: {
      property: "email",
      rich_text: { equals: email }
    }
  });

  return response.results[0]?.id || null;
}
