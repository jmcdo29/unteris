import { join } from 'path';
import {
	object,
	literal,
	enumType,
	merge,
	optional,
	string,
	transform,
	fallback,
	email,
	number,
} from 'valibot';

const hourInSeconds = 60 * 60;
const dayInSeconds = hourInSeconds * 24;

const prodConfig = object({
	NODE_ENV: literal('production'),
	NOREPLY_EMAIL: string([email()]),
	SMTP_PASS: string(),
	SMTP_HOST: string(),
	FILE_PATH: fallback(optional(string()), join(process.cwd(), 'images')),
});

const devConfig = object({
	NODE_ENV: enumType(['development', 'test']),
	NOREPLY_EMAIL: optional(string([email()])),
	SMTP_PASS: optional(string()),
	SMTP_HOST: optional(string()),
	FILE_PATH: fallback(
		string(),
		join(process.cwd(), 'apps', 'site', 'public', 'images')
	),
});

const dbConfig = object({
	DATABASE_USER: string(),
	DATABASE_PASSWORD: string(),
	DATABASE_PORT: transform(string(), (val) => Number.parseInt(val)),
	DATABASE_HOST: string(),
	DATABASE_NAME: string(),
});

const rabbitConfig = object({
	RABBIT_USER: string(),
	RABBIT_PASSWORD: string(),
	RABBIT_HOST: string(),
	RABBIT_PORT: string(),
});

const commonConfig = object({
	PORT: transform(fallback(string(), '3333'), (val: string) =>
		Number.parseInt(val, 10)
	),
	CORS: fallback(string(), 'http://localhost:4200'),
	REDIS_URL: string(),
	NODE_ENV: enumType(['development', 'production', 'test']),
	SESSION_EXPIRES_IN: fallback(number(), hourInSeconds),
	REFRESH_EXPIRES_IN: fallback(number(), 7 * dayInSeconds),
});
export const Config = merge([commonConfig, dbConfig, rabbitConfig, prodConfig]);
