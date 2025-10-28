export async function getCoordinadorId(nombreCoordinador: string): Promise<string | null> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_COORDINADORES_ID!,
    filter: {
      property: "title",
      title: { equals: nombreCoordinador }
    }
  });

  return response.results[0]?.id || null;
}
