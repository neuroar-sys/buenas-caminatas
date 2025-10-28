import { notion } from "../../lib/notion";

export async function getSlotPorId(id: string): Promise<{ cupo: number; reservas: number }> {
  const page = await notion.pages.retrieve({ page_id: id });
  const props = page.properties;

  const cupo = props.cupo_maximo?.number ?? 0;
  const reservas = props.reservas?.relation?.length ?? 0;

  return { cupo, reservas };
}
