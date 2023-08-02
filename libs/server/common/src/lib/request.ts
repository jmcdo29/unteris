import { z } from 'zod';
import { SessionDataSchema } from './session';

const RefreshRequestSchema = z.object({
  oldSession: SessionDataSchema,
});

export type RefreshRequest = z.infer<typeof RefreshRequestSchema>;
