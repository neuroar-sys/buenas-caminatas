import { notion } from "../../lib/notion";

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID!
    });

    res.status(200).json({ count: response.results.length });
  } catch (error) {
    console.error("Error al consultar Notion:", error);
    res.status(500).json({ error: "Falló la conexión con Notion" });
  }
}
