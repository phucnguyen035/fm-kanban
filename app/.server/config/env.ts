import dotenv from "dotenv";
dotenv.config();

import { object, optional, parse, picklist, startsWith, string } from "valibot";

export const env = Object.freeze(
  parse(
    object({
      DATABASE_URL: string([startsWith("postgresql://")]),
      DIRECT_DATABASE_URL: string([startsWith("postgresql://")]),
      NODE_ENV: optional(picklist(["development", "production"])),
    }),
    process.env
  )
);

export const isProd = env.NODE_ENV === "production";
