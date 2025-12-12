import { enumType, type Output } from "valibot";

export const RoleEnumSchema = enumType(["player", "dev", "dm", "admin"]);

export type RoleEnum = Output<typeof RoleEnumSchema>;
