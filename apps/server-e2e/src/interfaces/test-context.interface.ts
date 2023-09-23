import { Database } from "@unteris/server/kysely";
import { Kysely } from "kysely";

export interface DbContext {
	db: Kysely<Database>;
}
