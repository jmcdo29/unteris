import * as v from "valibot";

export const SignupSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(12)),
	name: v.pipe(v.string(), v.minLength(3)),
});

export type SignupUser = v.InferOutput<typeof SignupSchema>;
