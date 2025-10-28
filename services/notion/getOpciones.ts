import { notion } from "../../lib/notion";

export async function getOpcionesBasicas(databaseId: string, campo: string): Promise<string[]> {
  const response = await notion.databases.query({
    database_id: databaseId
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    return props[campo]?.title?.[0]?.plain_text ?? props[campo]?.rich_text?.[0]?.plain_text ?? "Sin nombre";
  });
}
