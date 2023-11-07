import { ExpressionBuilder, sql } from "kysely";
import { DB } from "./utils/db.interface";
import { kyselyDefaultUlid, kyselyUlid } from "./utils/ulid.sql";

export const up = async (db: DB) => {
	await db.schema
		.createTable("image")
		.addColumn("id", kyselyUlid, (col) =>
			col.defaultTo(kyselyDefaultUlid()).primaryKey(),
		)
		.addColumn("type", "text", (col) => col.notNull())
		.addColumn("original_url", "text")
		.addColumn("small_url", "text")
		.addColumn("medium_url", "text")
		.addColumn("large_url", "text")
		.execute();
	await db
		.insertInto("image")
		.columns(["type", "original_url"])
		.expression((eb) =>
			eb
				.selectFrom("deity")
				.select([eb.val("deity_avatar").as("type"), "image_url"]),
		)
		.execute();
	await db
		.insertInto("image")
		.columns(["type", "original_url"])
		.expression((eb) =>
			eb
				.selectFrom("user_account")
				.select([eb.val("user_avatar").as("type"), "photo_url"]),
		)
		.execute();
	await db.schema
		.alterTable("deity")
		.renameColumn("image_url", "image_id")
		.execute();
	await db.schema
		.alterTable("deity")
		.renameColumn("category", "category_id")
		.execute();
	await db.schema
		.alterTable("deity")
		.renameColumn("location", "location_id")
		.execute();
	await db.schema
		.alterTable("user_account")
		.renameColumn("photo_url", "image_id")
		.execute();
	await db
		.updateTable("deity")
		.set(
			(
				eb: ExpressionBuilder<Record<string, Record<string, unknown>>, string>,
			) => ({
				image_id: eb
					.selectFrom("image")
					.select("id")
					.where("original_url", "=", "deity.image_id")
					.where("type", "=", "deity_avatar"),
			}),
		)
		.execute();
	await db
		.updateTable("user_account")
		.set(
			(
				eb: ExpressionBuilder<Record<string, Record<string, unknown>>, string>,
			) => ({
				image_id: eb
					.selectFrom("image")
					.select("id")
					.where("original_url", "=", "user_account.image_id")
					.where("type", "=", "user_avatar"),
			}),
		)
		.execute();
	await db.schema
		.alterTable("deity")
		.alterColumn("image_id", (col) =>
			col.setDataType(sql`ulid USING (${sql.ref("image_id")}::ulid)`),
		)
		.execute();
	await db.schema
		.alterTable("deity")
		.addForeignKeyConstraint("deity_image_id_fkey", ["image_id"], "image", [
			"id",
		])
		.execute();
	await db.schema
		.alterTable("user_account")
		.alterColumn("image_id", (col) =>
			col.setDataType(sql`ulid USING (${sql.ref("image_id")}::ulid)`),
		)
		.execute();
	await db.schema
		.alterTable("user_account")
		.addForeignKeyConstraint(
			"user_account_image_id_fkey",
			["image_id"],
			"image",
			["id"],
		)
		.execute();
};

export const down = async (_db: DB) => {
	/* intentioanlly no op */
};
