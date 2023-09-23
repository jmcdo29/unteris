import { join } from "path";
import { z } from "zod";

const hourInSeconds = 60 * 60;
const dayInSeconds = hourInSeconds * 24;

const prodConfig = z.object({
	NODE_ENV: z.literal("production"),
	NOREPLY_EMAIL: z.string().email(),
	SMTP_PASS: z.string(),
	SMTP_HOST: z.string(),
	FILE_PATH: z.string().optional().default(join(process.cwd(), "images")),
});

const devConfig = z.object({
	NODE_ENV: z.enum(["development", "test"]),
	NOREPLY_EMAIL: z.string().email().optional(),
	SMTP_PASS: z.string().optional(),
	SMTP_HOST: z.string().optional(),
	FILE_PATH: z
		.string()
		.optional()
		.default(join(process.cwd(), "apps", "site", "public", "images")),
});

const dbConfig = z.object({
	DATABASE_USER: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_PORT: z.string().transform((val) => Number.parseInt(val)),
	DATABASE_HOST: z.string(),
	DATABASE_NAME: z.string(),
});

const rabbitConfig = z.object({
	RABBIT_USER: z.string(),
	RABBIT_PASSWORD: z.string(),
	RABBIT_HOST: z.string(),
	RABBIT_PORT: z.string(),
});

const commonConfig = z.object({
	PORT: z
		.optional(z.string().transform((val) => Number.parseInt(val, 10)))
		.default("3333"),
	CORS: z.optional(z.string()).default("http://localhost:4200"),
	REDIS_URL: z.string(),
	NODE_ENV: z.enum(["development", "production", "test"]),
	SESSION_EXPIRES_IN: z.number().optional().default(hourInSeconds),
	REFRESH_EXPIRES_IN: z
		.number()
		.optional()
		.default(7 * dayInSeconds),
});
export const Config = z.intersection(
	commonConfig.merge(dbConfig).merge(rabbitConfig),
	z.discriminatedUnion("NODE_ENV", [prodConfig, devConfig]),
);
