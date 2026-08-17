import { type RawBuilder, sql } from "kysely";

export const kyselyDefaultUlid = (): RawBuilder<string> => sql`gen_ulid()`;

/**
 * A simple helper for setting the type in SQL to "ulid" through the sql
 * template helper
 *
 * sql\`ulid\`
 */
export const kyselyUlid = sql<string>`ulid`;
