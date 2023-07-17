import { z } from 'zod';

const hourInSeconds = 60 * 60;
const dayInSeconds = hourInSeconds * 24;

const prodConfig = z.object({
  NODE_ENV: z.literal('production'),
  NOREPLY_EMAIL: z.string().email(),
  SMTP_PASS: z.string(),
  SMTP_HOST: z.string(),
});

const devConfig = z.object({
  NODE_ENV: z.enum(['development', 'test']),
  NOREPLY_EMAIL: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_HOST: z.string().optional(),
});

const commonConfig = z.object({
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
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SESSION_EXPIRES_IN: z.number().optional().default(hourInSeconds),
  REFRESH_EXPIRES_IN: z
    .number()
    .optional()
    .default(7 * dayInSeconds),
});
export const Config = z.intersection(
  commonConfig,
  z.discriminatedUnion('NODE_ENV', [prodConfig, devConfig])
);
