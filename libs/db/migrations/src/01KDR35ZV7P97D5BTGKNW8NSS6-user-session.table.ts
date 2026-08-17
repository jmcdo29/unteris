import { sql } from "kysely";
import type { DB } from "./utils/db.interface";
import { kyselyUlid } from "./utils/ulid.sql";

export const up = async (db: DB) => {
	await db.schema
		.createTable("userSession")
		.addColumn("id", "text", (col) => col.notNull().primaryKey())
		.addColumn("userId", kyselyUlid, (col) =>
			col.references("userAccount.id").notNull().onDelete("cascade"),
		)
		.addColumn("operatingSystem", "text")
		.addColumn("ipAddress", sql`inet`)
		.addColumn("browserType", "text")
		.addColumn("lastUsed", "timestamptz")
		.execute();
};

export const down = async (db: DB) => {
	await db.schema.dropTable("userSession").execute();
};
