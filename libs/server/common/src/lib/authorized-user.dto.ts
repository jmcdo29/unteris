import * as v from "valibot";

import { RoleEnumSchema } from "./role.enum";

export const AuthorizedUserSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	email: v.pipe(v.string(), v.email()),
	roles: v.array(RoleEnumSchema),
});

export type AuthorizedUser = v.InferOutput<typeof AuthorizedUserSchema>;
