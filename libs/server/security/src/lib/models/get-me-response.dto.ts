import { RoleEnumSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const GetMeResponseSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	email: v.string(),
	roles: v.array(RoleEnumSchema),
	displayName: v.string(),
});

export type GetMeResponse = v.InferOutput<typeof GetMeResponseSchema>;

export class GetMeResponseDto extends ValibotDto(GetMeResponseSchema) {}
