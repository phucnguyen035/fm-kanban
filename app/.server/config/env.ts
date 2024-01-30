import dotenv from "dotenv";
dotenv.config();

import { object, parse, picklist, startsWith, string, fallback } from "valibot";

export const env = Object.freeze(
  parse(
    object({
      DATABASE_URL: string([startsWith("postgresql://")]),
      DIRECT_DATABASE_URL: string([startsWith("postgresql://")]),
      NODE_ENV: fallback(picklist(["development", "production"]), "production"),
    }),
    process.env
  )
);

export const isProd = env.NODE_ENV === "production";
