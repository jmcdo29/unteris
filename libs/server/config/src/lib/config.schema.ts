import { z } from 'zod';

export const Config = z.object({
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.string().transform((val) => Number.parseInt(val)),
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  PORT: z
    .optional(z.string().transform((val) => Number.parseInt(val, 10)))
    .default('3333'),
  CORS: z.optional(z.string()).default('http://localhost:4200'),
  REDIS_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production']),
});
