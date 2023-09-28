import { Kysely } from "kysely";
import { kyselyUlid } from "./utils/ulid.sql";

export const up = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
) => {
	await db.schema
		.alterTable("location")
		.addColumn("type", "text")
		.addColumn("parent_id", kyselyUlid, (col) => col.references("location.id"))
		.execute();
	await db.updateTable("location").set({ type: "plane" }).execute();
};

export const down = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
) => {
	await db.schema
		.alterTable("location")
		.dropColumn("parent_id")
		.dropColumn("type")
		.execute();
};
