import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

const db = drizzle(sql, { schema, logger: process.env.NODE_ENV === "development" });

export { db, schema };
