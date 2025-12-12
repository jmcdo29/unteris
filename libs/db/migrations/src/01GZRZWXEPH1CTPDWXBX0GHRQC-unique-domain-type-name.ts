import type { DB } from "./utils/db.interface";

const domainNameType = "domain_name_type";

export const up = async (db: DB) => {
	await db.schema
		.alterTable("domain")
		.addUniqueConstraint(domainNameType, ["name", "type"])
		.execute();
};

export const down = async (db: DB) => {
	await db.schema.alterTable("domain").dropConstraint(domainNameType).execute();
};
