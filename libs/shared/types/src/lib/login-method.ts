import { type Output, enumType, object, string, ulid } from "valibot";

export const LoginMethodSchema = object({
	id: string([ulid()]),
	userId: string([ulid()]),
	name: enumType(["local"]),
});
export type LoginMethod = Output<typeof LoginMethodSchema>;
