import { z } from "valibot";
import { SessionDataSchema } from "./session";

const RefreshRequestSchema = object({
	oldSession: SessionDataSchema,
});

export type RefreshRequest = Output<typeof RefreshRequestSchema>;
