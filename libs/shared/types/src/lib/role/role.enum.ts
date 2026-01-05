import * as v from "valibot";

export const RoleEnum = v.picklist(["player", "dev", "admin", "dm"]);

export type RoleEnum = v.InferOutput<typeof RoleEnum>;
