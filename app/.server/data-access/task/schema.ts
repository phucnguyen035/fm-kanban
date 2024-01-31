import { relations } from "drizzle-orm";
import {
  foreignKey,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { boardColumn } from "../board-column/schema";

export const taskStatusEnum = pgEnum("task_status_enum", [
  "todo",
  "doing",
  "done",
]);
export type TaskStatus = (typeof taskStatusEnum.enumValues)[number];

export const task = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    title: varchar("title").notNull(),
    description: text("description"),
    status: taskStatusEnum("status").notNull().default("todo"),
    parentTaskId: integer("parent_task_id"),
    columnId: integer("column_id")
      .notNull()
      .references(() => boardColumn.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    parent: foreignKey({
      columns: [t.parentTaskId],
      foreignColumns: [t.id],
    }),
  })
);

export const taskRelations = relations(task, ({ one, many }) => ({
  subTasks: many(task, { relationName: "sub_tasks" }),
  parentTask: one(task, {
    references: [task.id],
    fields: [task.parentTaskId],
    relationName: "sub_tasks",
  }),
  column: one(boardColumn, {
    references: [boardColumn.id],
    fields: [task.columnId],
  }),
}));
