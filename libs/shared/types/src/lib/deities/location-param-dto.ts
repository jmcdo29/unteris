import { z } from "zod";

export const LocationParamSchema = z.object({
	location: z.string().ulid(),
});

export type LocationParam = z.infer<typeof LocationParamSchema>;
