import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { board } from "../board/schema";
import { task } from "../task/schema";

export const boardColumn = pgTable("board_columns", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  boardId: integer("board_id")
    .notNull()
    .references(() => board.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const boardColumnRelations = relations(boardColumn, ({ one, many }) => ({
  board: one(board, {
    fields: [boardColumn.boardId],
    references: [board.id],
  }),
  tasks: many(task),
}));
