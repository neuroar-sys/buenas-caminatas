const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function inspectDatabase() {
  const databaseId = process.env.DATABASE_RESERVAS_ID;
  const response = await notion.databases.retrieve({ database_id: databaseId });

  console.log("🧪 Propiedades en la base de datos:");
  for (const [key, value] of Object.entries(response.properties)) {
    console.log(`- ${key} (${value.type})`);
  }
}

inspectDatabase().catch(console.error);
