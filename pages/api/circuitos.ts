import { notion } from "../../lib/notion";

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID!
    });

    const circuitos = response.results.map((page: any) => {
      const props = page.properties;
      const fotoUrl = props.foto?.files?.[0]?.file?.url || props.foto?.files?.[0]?.external?.url || null;

      return {
        id: page.id,
        nombre: props.nombre?.title?.[0]?.plain_text ?? "Sin nombre",
        zona: props.zona?.select?.name ?? "Sin zona",
        localidad: props.localidad?.rich_text?.[0]?.plain_text ?? "Sin localidad",
        distancia_m: props.distancia_m?.number ?? 0,
        foto: fotoUrl
      };
    });

    res.status(200).json(circuitos);
  } catch (error) {
    console.error("❌ Error al cargar circuitos:", error);
    res.status(500).json({ error: "Falló la conexión con Notion" });
  }
}
