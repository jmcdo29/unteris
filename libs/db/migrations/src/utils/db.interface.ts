import type { Kysely } from "kysely";

export type DB = Kysely<Record<string, Record<string, unknown>>>;
