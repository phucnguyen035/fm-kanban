import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as boardColumnSchema from "../data-access/board-column/schema";
import * as boardSchema from "../data-access/board/schema";
import * as taskSchema from "../data-access/task/schema";
import { env, isProd } from "./env";

neonConfig.webSocketConstructor = ws;

const client = new Pool({
  connectionString: env.DATABASE_URL,
});

console.log("client: ", client);
console.log("env: ", env);

export const db = drizzle(client, {
  schema: {
    ...boardSchema,
    ...boardColumnSchema,
    ...taskSchema,
  },
  logger: !isProd,
});

console.log("db: ", db);
