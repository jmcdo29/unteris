import { z } from "zod";

export abstract class ZodDtoClass<T extends z.ZodSchema> {
	static schema: z.ZodSchema;

	data: z.infer<T>;
}
