import * as v from "valibot";

export const RoleEnumSchema = v.picklist(["player", "dev", "dm", "admin"]);

export type RoleEnum = v.InferOutput<typeof RoleEnumSchema>;
