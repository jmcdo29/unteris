import { z } from 'zod';

export abstract class ZodDtoClass {
  static schema: z.ZodSchema;
}
