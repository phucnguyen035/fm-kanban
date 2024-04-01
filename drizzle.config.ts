import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: [".env", ".env.local"] });

export default defineConfig({
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL_NON_POOLING!,
	},
	schema: "./src/db/schema.ts",
	tablesFilter: "fm_kanban_*",
});
