import * as v from "valibot";

import { RoleEnum } from "../role";

const LoginResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	displayName: v.string(),
	success: v.boolean(),
	roles: v.array(RoleEnum),
	sessionId: v.string(),
});

export type LoginResponse = v.InferOutput<typeof LoginResponseSchema>;
