import { Output, object, omit } from "valibot";
import { AuthorizedUserSchema } from "./authorized-user.dto";
import { SessionDataSchema } from "./session";

const RefreshRequestSchema = object({
	oldSession: omit(SessionDataSchema, ["id"]),
});

export type RefreshRequest = Output<typeof RefreshRequestSchema>;

const AuthorizedRequestSchema = object({
	user: AuthorizedUserSchema,
	session: SessionDataSchema,
});

export type AuthorizedRequest = Output<typeof AuthorizedRequestSchema>;
