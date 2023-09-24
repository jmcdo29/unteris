import { Output, enumType, object, string, ulid } from "valibot";

export const VerificationTokenSchema = object({
	id: string([ulid()]),
	token: string(),
	userId: string([ulid()]),
	type: enumType(["verification", "reset"]),
});

export type VerificationToken = Output<typeof VerificationTokenSchema>;
