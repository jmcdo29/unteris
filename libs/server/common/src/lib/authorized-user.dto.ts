<<<<<<< HEAD
import * as v from "valibot";

=======
import {
	type Output,
	array,
	boolean,
	email,
	enumType,
	object,
	string,
	ulid,
} from "valibot";
>>>>>>> 6631869 (chore: update code for biome rules)
import { RoleEnumSchema } from "./role.enum";

export const AuthorizedUserSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	email: v.pipe(v.string(), v.email()),
	roles: v.array(RoleEnumSchema),
	displayName: v.string(),
});

export type AuthorizedUser = v.InferOutput<typeof AuthorizedUserSchema>;
