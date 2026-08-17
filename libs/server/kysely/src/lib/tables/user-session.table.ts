import * as v from "valibot";

export const UserSessionSchema = v.object({
	id: v.string(),
	userId: v.pipe(v.string(), v.ulid()),
	operatingSystem: v.string(),
	ipAddress: v.pipe(v.string(), v.ip()),
	browserType: v.string(),
	lastUsed: v.nullish(v.string()),
});

export type UserSession = v.InferOutput<typeof UserSessionSchema>;
