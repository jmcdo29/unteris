import { Database } from "@unteris/server/kysely";
import { Kysely } from "kysely";
import { Transporter } from "nodemailer";
import JSONTransport from "nodemailer/lib/json-transport";

export interface TestContext {
	db: Kysely<Database>;
	mailer: Transporter<JSONTransport>;
}
