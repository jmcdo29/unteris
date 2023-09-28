import {
	AlterColumnBuilder,
	AlterColumnBuilderCallback,
	Kysely,
	sql,
} from "kysely";
import { kyselyDefaultUlid } from "./utils/ulid.sql";

const convertToUlid = (
	column: string,
): [string, AlterColumnBuilderCallback] => [
	column,
	(col: AlterColumnBuilder) =>
		col.setDataType(sql`ulid USING (${sql.ref(column)}::ulid)`),
];

const setUlidDefault = (
	column: string,
): [string, AlterColumnBuilderCallback] => [
	column,
	(col: AlterColumnBuilder) => col.setDefault(kyselyDefaultUlid()),
];

const migrateTableColumnToUlid = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
	table: string,
	column: string,
	setDefault = false,
): Promise<void> => {
	let command = db.schema
		.alterTable(table)
		.alterColumn(column, (col) => col.dropDefault())
		.alterColumn(...convertToUlid(column));
	if (setDefault) {
		command = command.alterColumn(...setUlidDefault(column));
	}
	await command.execute();
};

const recreateForeignKey = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
	table: string,
	column: string,
	targetTable: string,
	targetColumn: string,
): Promise<void> => {
	await db.schema
		.alterTable(table)
		.addForeignKeyConstraint(`${table}_${column}_fkey`, [column], targetTable, [
			targetColumn,
		])
		.execute();
};

export const up = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
): Promise<void> => {
	await sql`CREATE EXTENSION ulid;`.execute(db);
	await db.schema
		.alterTable("deity_domain")
		.dropConstraint("deity_domain_deity_id_fkey")
		.execute();
	await db.schema
		.alterTable("deity_domain")
		.dropConstraint("deity_domain_domain_id_fkey")
		.execute();
	await migrateTableColumnToUlid(db, "domain", "id", true);
	await migrateTableColumnToUlid(db, "deity", "id", true);
	await migrateTableColumnToUlid(db, "deity_domain", "id", true);
	await migrateTableColumnToUlid(db, "deity_domain", "deity_id");
	await migrateTableColumnToUlid(db, "deity_domain", "domain_id");
	await recreateForeignKey(db, "deity_domain", "deity_id", "deity", "id");
	await recreateForeignKey(db, "deity_domain", "domain_id", "domain", "id");
	await db.schema
		.alterTable("deity")
		.dropConstraint("deity_category_fkey")
		.execute();
	await db.schema
		.alterTable("deity")
		.dropConstraint("deity_location_fkey")
		.execute();
	await migrateTableColumnToUlid(db, "deity_category", "id", true);
	await migrateTableColumnToUlid(db, "deity", "category");
	await migrateTableColumnToUlid(db, "deity", "location");
	await recreateForeignKey(db, "deity", "category", "deity_category", "id");
	await migrateTableColumnToUlid(db, "location", "id", true);
	await recreateForeignKey(db, "deity", "location", "location", "id");
	await db.schema
		.alterTable("racial_ability")
		.dropConstraint("racial_ability_race_id_fkey")
		.execute();
	await migrateTableColumnToUlid(db, "race", "id", true);
	await migrateTableColumnToUlid(db, "racial_ability", "id", true);
	await migrateTableColumnToUlid(db, "racial_ability", "race_id");
	await recreateForeignKey(db, "racial_ability", "race_id", "race", "id");
	await db.schema
		.alterTable("user_permission")
		.dropConstraint("user_permission_role_id_fkey")
		.execute();
	await db.schema
		.alterTable("user_permission")
		.dropConstraint("user_permission_user_id_fkey")
		.execute();
	await db.schema
		.alterTable("login_method")
		.dropConstraint("login_method_user_id_fkey")
		.execute();
	await db.schema
		.alterTable("local_login")
		.dropConstraint("local_login_login_method_id_fkey")
		.execute();
	await db.schema
		.alterTable("verification_token")
		.dropConstraint("verification_token_user_id_fkey")
		.execute();
	await migrateTableColumnToUlid(db, "verification_token", "id", true);
	await migrateTableColumnToUlid(db, "verification_token", "user_id");
	await migrateTableColumnToUlid(db, "role", "id", true);
	await migrateTableColumnToUlid(db, "local_login", "id", true);
	await migrateTableColumnToUlid(db, "local_login", "login_method_id");
	await migrateTableColumnToUlid(db, "login_method", "id", true);
	await migrateTableColumnToUlid(db, "login_method", "user_id");
	await migrateTableColumnToUlid(db, "user_account", "id", true);
	await recreateForeignKey(
		db,
		"verification_token",
		"user_id",
		"user_account",
		"id",
	);
	await db.schema
		.alterTable("verification_token")
		.dropColumn("expires_at")
		.execute();
	await migrateTableColumnToUlid(db, "user_permission", "id", true);
	await migrateTableColumnToUlid(db, "user_permission", "user_id");
	await migrateTableColumnToUlid(db, "user_permission", "role_id");
	await recreateForeignKey(db, "user_permission", "role_id", "role", "id");
	await recreateForeignKey(
		db,
		"user_permission",
		"user_id",
		"user_account",
		"id",
	);
	await recreateForeignKey(db, "login_method", "user_id", "user_account", "id");
	await recreateForeignKey(
		db,
		"local_login",
		"login_method_id",
		"login_method",
		"id",
	);
};

export const down = async (
	db: Kysely<Record<string, Record<string, unknown>>>,
) => {
	await sql`DROP EXTENSION ulid`.execute(db);
};
