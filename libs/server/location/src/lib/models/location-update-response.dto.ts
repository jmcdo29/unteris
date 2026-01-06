import { SuccessSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const LocationUpdateResponseSchema = v.object({ ...SuccessSchema.entries });

export type LocationUpdateResponse = v.InferOutput<
	typeof LocationUpdateResponseSchema
>;

export class LocationUpdateResponseDto extends ValibotDto(
	LocationUpdateResponseSchema,
) {}
