import { RawBuilder, sql } from "kysely";

export const uniqueNullsNotDistinct = (
	table: string,
	name: string,
	columns: string[],
): RawBuilder<string> => {
	return sql`ALTER TABLE ${sql.ref(table)} ADD CONSTRAINT ${sql.raw(
		name,
	)} UNIQUE NULLS NOT DISTINCT (${sql.raw(columns.join(", "))});`;
};
