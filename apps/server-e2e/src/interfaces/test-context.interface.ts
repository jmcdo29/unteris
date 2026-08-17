import type { Database } from "@unteris/server/kysely";
import type { Kysely } from "kysely";
import type { Transporter } from "nodemailer";
import type JSONTransport from "nodemailer/lib/json-transport";

export interface TestContext {
	db: Kysely<Database>;
	mailer: Transporter<JSONTransport>;
}
