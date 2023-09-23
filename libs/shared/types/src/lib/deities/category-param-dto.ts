import { z } from 'zod';

export const CategoryParamSchema = z.object({
	category: z.string().ulid(),
});

export type CategoryParam = z.infer<typeof CategoryParamSchema>;
