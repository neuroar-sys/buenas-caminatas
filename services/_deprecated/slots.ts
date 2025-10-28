import { notion } from "../lib/notion";
import { Horario } from "../models/Horario";

export async function getTodosLosHorarios(): Promise<Horario[]> {
  const databaseId = process.env.DATABASE_HORARIOS_ID;

  if (!databaseId) {
    throw new Error("Falta NOTION_DB_HORARIOS_ID en el entorno");
  }

  const response = await notion.databases.query({
    database_id: databaseId
  });

  const horarios: Horario[] = response.results.map((page: any) => {
    const props = page.properties;

    return {
      title: props.title?.title?.[0]?.plain_text ?? "",
      circuito: props.circuito?.select?.name ?? "",
      fecha: props.fecha?.rich_text?.[0]?.plain_text ?? "",
      hora: props.hora?.rich_text?.[0]?.plain_text ?? "",
      cupo_maximo: props.cupo_maximo?.number ?? 0,
      reservas: props.reservas?.multi_select?.map((r: any) => r.name) ?? []
    };
  });

  return horarios;
}
