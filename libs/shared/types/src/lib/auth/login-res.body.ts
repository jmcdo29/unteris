import { Output, boolean, object, string, ulid } from "valibot";

const LoginResponseSchema = object({
	id: string([ulid()]),
	displayName: string(),
	success: boolean(),
});

export type LoginResponse = Output<typeof LoginResponseSchema>;
