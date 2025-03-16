import { type Output, enumType } from "valibot";

export const RoleEnum = enumType(["player", "dev", "admin", "dm"]);

export type RoleEnum = Output<typeof RoleEnum>;
