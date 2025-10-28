import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getHorarios(): Promise<{ circuitoId: string; nombre: string }[]> {
  const databaseId = process.env.DATABASE_HORARIOS_ID!;
  const response = await notion.databases.query({ database_id: databaseId });

  return response.results.map((page: any) => {
    const props = page.properties;
    const circuito = props.Circuito?.relation?.[0]?.id || "sin-circuito";
    const nombre =
      props.Nombre?.title?.[0]?.plain_text ||
      props.Title?.title?.[0]?.plain_text ||
      props.Fecha?.rich_text?.[0]?.plain_text ||
      "Sin nombre";

    return {
      circuitoId: circuito,
      nombre
    };
  });
}
