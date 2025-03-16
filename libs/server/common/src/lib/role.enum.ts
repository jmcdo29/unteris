<<<<<<< HEAD
import * as v from "valibot";
=======
import { type Output, enumType } from "valibot";
>>>>>>> 6631869 (chore: update code for biome rules)

export const RoleEnumSchema = v.picklist(["player", "dev", "dm", "admin"]);

export type RoleEnum = v.InferOutput<typeof RoleEnumSchema>;
