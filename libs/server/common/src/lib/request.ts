import { Output, object, omit } from "valibot";
import { SessionDataSchema } from "./session";

const RefreshRequestSchema = object({
	oldSession: omit(SessionDataSchema, ["id"]),
});

export type RefreshRequest = Output<typeof RefreshRequestSchema>;
