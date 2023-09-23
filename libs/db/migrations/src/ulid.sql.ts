import { RawBuilder, sql } from "kysely";

export const kyselyDefaultUlid = (): RawBuilder<string> => {
	return sql`gen_ulid()`;
};

export const kyselyUlid = sql`ulid`;
