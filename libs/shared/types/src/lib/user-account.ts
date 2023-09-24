import {
	url,
	Output,
	boolean,
	email,
	object,
	optional,
	string,
	ulid,
} from "valibot";

export const UserAccountSchema = object({
	id: string([ulid()]),
	name: string(),
	email: string([email()]),
	isVerified: boolean(),
	imageId: optional(string([url()])),
});

export type UserAccount = Output<typeof UserAccountSchema>;
