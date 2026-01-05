import * as v from "valibot";

export const LoginBodySchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(12)),
});

export type LoginBody = v.InferOutput<typeof LoginBodySchema>;
