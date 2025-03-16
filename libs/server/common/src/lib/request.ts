<<<<<<< HEAD
import * as v from "valibot";

=======
import { type Output, array, object, omit, required } from "valibot";
>>>>>>> 6631869 (chore: update code for biome rules)
import { AuthorizedUserSchema } from "./authorized-user.dto";
import { SessionDataSchema } from "./session";

const RefreshRequestSchema = v.object({
	oldSession: v.omit(SessionDataSchema, ["id"]),
});

export type RefreshRequest = v.InferOutput<typeof RefreshRequestSchema>;

const AuthorizedRequestSchema = v.object({
	user: AuthorizedUserSchema,
	sessionId: v.string(),
});

export type AuthorizedRequest = v.InferOutput<typeof AuthorizedRequestSchema>;
