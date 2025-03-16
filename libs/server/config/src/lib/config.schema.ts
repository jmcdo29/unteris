import { join } from "node:path";
<<<<<<< HEAD
import * as v from "valibot";
=======
import {
	email,
	enumType,
	fallback,
	intersection,
	merge,
	number,
	object,
	optional,
	string,
	transform,
	union,
} from "valibot";
>>>>>>> 6631869 (chore: update code for biome rules)

const hourInSeconds = 60 * 60;
const dayInSeconds = hourInSeconds * 24;

const prodConfig = v.object({
	NODE_ENV: v.picklist(["production"]),
	NOREPLY_EMAIL: v.pipe(v.string(), v.email()),
	SMTP_PASS: v.string(),
	SMTP_HOST: v.string(),
	FILE_PATH: v.fallback(v.string(), join(process.cwd(), "images")),
	ENCRYPTION_KEY: v.string(),
	ENCRYPTION_IV: v.string(),
});

const devConfig = v.object({
	NODE_ENV: v.picklist(["development", "test"]),
	NOREPLY_EMAIL: v.optional(v.pipe(v.string(), v.email())),
	SMTP_PASS: v.optional(v.string()),
	SMTP_HOST: v.optional(v.string()),
	FILE_PATH: v.fallback(
		v.string(),
		join(process.cwd(), "apps", "site", "public", "images"),
	),
	ENCRYPTION_KEY: v.fallback(v.string(), "replace-this"),
	ENCRYPTION_IV: v.fallback(v.string(), "replace-this"),
});

const dbConfig = v.object({
	DATABASE_USER: v.string(),
	DATABASE_PASSWORD: v.string(),
	DATABASE_PORT: v.pipe(
		v.string(),
		v.transform((val) => Number.parseInt(val, 10)),
	),
	DATABASE_HOST: v.string(),
	DATABASE_NAME: v.string(),
});

const rabbitConfig = v.object({
	RABBIT_USER: v.string(),
	RABBIT_PASSWORD: v.string(),
	RABBIT_HOST: v.string(),
	RABBIT_PORT: v.string(),
});

const commonConfig = v.object({
	PORT: v.pipe(
		v.fallback(v.string(), "3333"),
		v.transform((val: string) => Number.parseInt(val, 10)),
	),
	CORS: v.fallback(v.string(), "http://localhost:4200"),
	REDIS_URL: v.string(),
	SESSION_EXPIRES_IN: v.fallback(v.number(), hourInSeconds),
	REFRESH_EXPIRES_IN: v.fallback(v.number(), 7 * dayInSeconds),
});

const envConfig = v.union([devConfig, prodConfig]);

export const Config = v.intersect([
	envConfig,
	commonConfig,
	dbConfig,
	rabbitConfig,
]);
