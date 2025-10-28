import { notion } from "../../lib/notion";

export async function getNombreCircuitoPorId(id: string): Promise<string> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const props = page.properties;

    for (const key in props) {
      const field = props[key];
      if (field.type === "title" && field.title.length > 0) {
        return field.title[0].plain_text;
      }
    }

    for (const key in props) {
      const field = props[key];
      if (field.type === "rich_text" && field.rich_text.length > 0) {
        return field.rich_text[0].plain_text;
      }
    }

    return "Circuito sin nombre";
  } catch (error) {
    console.error("❌ Error al obtener circuito:", error);
    return "Circuito desconocido";
  }
}
