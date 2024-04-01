import { relations } from "drizzle-orm";
import { boolean, pgTableCreator, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const tableCreator = pgTableCreator((name) => `fm_kanban_${name}`);

export const boards = tableCreator("boards", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name").notNull().unique(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const boardRelations = relations(boards, ({ many }) => ({
	columns: many(columns),
}));

export const columns = tableCreator("columns", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name").notNull(),
	boardId: uuid("board_id")
		.notNull()
		.references(() => boards.id, { onDelete: "cascade" }),
});

export const columnRelations = relations(columns, ({ one, many }) => ({
	board: one(boards, {
		fields: [columns.boardId],
		references: [boards.id],
	}),
	tasks: many(tasks),
}));

export const tasks = tableCreator("tasks", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
	columnId: uuid("column_id")
		.notNull()
		.references(() => columns.id, { onDelete: "cascade" }),
});

export const taskRelations = relations(tasks, ({ one, many }) => ({
	column: one(columns, {
		fields: [tasks.columnId],
		references: [columns.id],
	}),
	subTasks: many(subTasks),
}));

export const subTasks = tableCreator("sub_tasks", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name").notNull(),
	completed: boolean("completed").notNull().default(false),
	taskId: uuid("task_id")
		.notNull()
		.references(() => tasks.id, { onDelete: "cascade" }),
});

export const subTaskRelations = relations(subTasks, ({ one }) => ({
	task: one(tasks, {
		fields: [subTasks.taskId],
		references: [tasks.id],
	}),
}));
