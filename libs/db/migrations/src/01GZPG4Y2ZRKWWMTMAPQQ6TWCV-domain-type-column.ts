<<<<<<< HEAD
=======
import { Kysely } from "kysely";
>>>>>>> 6631869 (chore: update code for biome rules)
import type { DB } from "./utils/db.interface";

export const up = async (db: DB) => {
	await db.schema.alterTable("domain").addColumn("type", "text").execute();
};

export const down = async (db: DB) => {
	await db.schema.alterTable("domain").dropColumn("type").execute();
};
