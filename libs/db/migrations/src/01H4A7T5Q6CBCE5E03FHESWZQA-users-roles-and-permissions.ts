<<<<<<< HEAD
import { sql } from "kysely";
=======
import { Kysely, sql } from "kysely";
>>>>>>> 6631869 (chore: update code for biome rules)
import type { DB } from "./utils/db.interface";

export const up = async (db: DB) => {
	await db.schema
		.createTable("role")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("name", "text", (col) => col.notNull())
		.execute();
	await db.schema
		.createTable("user_account")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("name", "text", (col) => col.notNull())
		.addColumn("email", "text", (col) => col.notNull())
		.addColumn("is_verified", "boolean")
		.addColumn("photo_url", "text")
		.addUniqueConstraint("unique_username", ["name"])
		.addUniqueConstraint("unique_user_email", ["email"])
		.execute();
	await db.schema
		.createTable("user_permission")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("user_id", "text", (col) =>
			col.notNull().references("user_account.id"),
		)
		.addColumn("role_id", "text", (col) => col.notNull().references("role.id"))
		.execute();
	await db.schema
		.createTable("login_method")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("user_id", "text", (col) =>
			col.notNull().references("user_account.id"),
		)
		.addColumn("name", "text", (col) => col.notNull())
		.execute();
	await db.schema
		.createTable("local_login")
		.addColumn("id", "text", (col) => col.defaultTo(sql`ulid()`).primaryKey())
		.addColumn("password", "text", (col) => col.notNull())
		.addColumn("login_method_id", "text", (col) =>
			col.notNull().references("login_method.id"),
		)
		.addColumn("last_used", "timetz")
		.addColumn("attempts", "integer", (col) => col.defaultTo(0))
		.execute();
};

export const down = async ({ schema }: DB) => {
	await schema.dropTable("local_login").execute();
	await schema.dropTable("login_method").execute();
	await schema.dropTable("user_permission").execute();
	await schema.dropTable("user_account").execute();
	await schema.dropTable("role").execute();
};
