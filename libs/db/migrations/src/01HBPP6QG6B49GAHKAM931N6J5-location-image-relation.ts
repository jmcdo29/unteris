import type { DB } from "./utils/db.interface";
import { kyselyUlid } from "./utils/ulid.sql";

export const up = async (db: DB) => {
	await db.schema
		.alterTable("location")
		.addColumn("imageId", kyselyUlid, (col) => col.references("image.id"))
		.execute();
};

export const down = async (db: DB) => {
	await db.schema.alterTable("location").dropColumn("imageId").execute();
};
