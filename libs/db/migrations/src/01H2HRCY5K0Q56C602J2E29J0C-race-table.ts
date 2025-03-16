import { Kysely, sql } from "kysely";
import type { DB } from "./utils/db.interface";

export const up = async (db: DB) => {
	await db.schema
		.createTable("race")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("name", "text", (col) => col.notNull())
		.addColumn("description", "text", (col) => col.notNull())
		.addColumn("age_description", "text", (col) => col.notNull())
		.addColumn("size_description", "text", (col) => col.notNull())
		.addColumn("type", "text", (col) => col.defaultTo("humanoid").notNull())
		.addColumn("speed", "integer", (col) => col.defaultTo(30).notNull())
		.addColumn("known_languages", "text", (col) =>
			col.notNull().defaultTo("You can speak and read Common"),
		)
		.execute();
	await db.schema
		.createTable("racial_ability")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("race_id", "text", (col) =>
			col.references("race.id").notNull().onDelete("cascade"),
		)
		.addColumn("name", "text", (col) => col.notNull())
		.addColumn("description", "text", (col) => col.notNull())
		.execute();
};

export const down = async (db: DB) => {
	await db.schema.dropTable("racial_ability").execute();
	await db.schema.dropTable("race").execute();
};
