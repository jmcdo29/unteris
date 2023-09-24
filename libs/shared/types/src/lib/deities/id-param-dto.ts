import { z } from "zod";

export const IdParamSchema = z.object({
	id: z.string().ulid(),
});

export type IdParam = z.infer<typeof IdParamSchema>;
