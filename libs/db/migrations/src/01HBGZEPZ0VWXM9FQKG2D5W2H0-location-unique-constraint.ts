import { DB } from "./utils/db.interface";
import { uniqueNullsNotDistinct } from "./utils/unique-nulls-not-distinct.sql";

export const up = async (db: DB) => {
	await uniqueNullsNotDistinct("location", "name_type_parent_unique", [
		"name",
		"type",
		"parent_id",
	]).execute(db);
	await db.schema
		.alterTable("race")
		.addUniqueConstraint("race_name_unique", ["name"])
		.execute();
	await uniqueNullsNotDistinct(
		"racial_ability",
		"racial_ability_name_race_unique",
		["name", "race_id"],
	).execute(db);
};

export const down = async (db: DB) => {
	await db.schema
		.alterTable("location")
		.dropConstraint("name_type_parent_unique")
		.execute();
	// await db.schema
	// 	.alterTable("race")
	// 	.dropConstraint("race_name_unique")
	// 	.execute();
	// await db.schema
	// 	.alterTable("racial_ability")
	// 	.dropConstraint("racial_ability_name_race_unique")
	// 	.execute();
};
