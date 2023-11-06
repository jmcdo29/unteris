import { Output, enumType } from "valibot";

export const RoleEnumSchema = enumType(["player", "dev", "dm", "admin"]);

export type RoleEnum = Output<typeof RoleEnumSchema>;
