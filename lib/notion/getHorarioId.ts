export async function getHorarioId(nombreHorario: string): Promise<string | null> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_HORARIOS_ID!,
    filter: {
      property: "title",
      title: { equals: nombreHorario }
    }
  });

  return response.results[0]?.id || null;
}
