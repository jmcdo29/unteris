import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const GetRefreshResponseSchema = v.object({
	sessionId: v.string(),
});

export type GetRefreshResponse = v.InferOutput<typeof GetRefreshResponseSchema>;

export class GetRefreshResponseDto extends ValibotDto(
	GetRefreshResponseSchema,
) {}
