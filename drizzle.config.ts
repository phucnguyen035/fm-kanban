import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  driver: "pg",
  schema: "./app/.server/data-access/**/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DIRECT_DATABASE_URL ?? "",
  },
} satisfies Config;
