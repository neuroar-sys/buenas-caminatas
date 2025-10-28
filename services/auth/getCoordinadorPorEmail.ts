// services/auth/getCoordinadorPorEmail.ts
export async function getCoordinadorPorEmail(email: string): Promise<boolean> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_COORDINADORES_ID!,
    filter: {
      property: "email",
      rich_text: { equals: email }
    }
  });

  return response.results.length > 0;
}
