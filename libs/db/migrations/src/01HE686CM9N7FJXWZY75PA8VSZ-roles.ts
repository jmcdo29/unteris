import type { DB } from "./utils/db.interface";

const roles = ["player", "dev", "dm", "admin"];

export const up = async (db: DB) => {
	await db
		.insertInto("role")
		.values(roles.map((r) => ({ name: r })))
		.execute();
};

export const down = async (db: DB) => {
	await db
		.deleteFrom("user_permission")
		.where((ref) =>
			ref(
				"role_id",
				"in",
				ref.selectFrom("role").select("id").where("name", "in", roles),
			),
		)
		.execute();
	await db.deleteFrom("role").where("name", "in", roles).execute();
};
