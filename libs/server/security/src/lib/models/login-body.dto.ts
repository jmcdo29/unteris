import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const LoginBodySchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(12)),
});

export type LoginBody = v.InferOutput<typeof LoginBodySchema>;

export class LoginBodyDto extends ValibotDto(LoginBodySchema) {}
