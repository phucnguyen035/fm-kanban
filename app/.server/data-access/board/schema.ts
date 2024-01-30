import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { boardColumn } from "../board-column/schema";

export const board = pgTable("boards", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const boardRelations = relations(board, ({ many }) => ({
  columns: many(boardColumn),
}));
