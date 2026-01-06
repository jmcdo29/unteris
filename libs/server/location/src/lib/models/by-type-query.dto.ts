import { LocationTypeSchema, ValibotDto } from "@unteris/server/common";

import * as v from "valibot";

export const LocationByTypeQuerySchema = v.object({ type: LocationTypeSchema });

export type LocationByTypeQuery = v.InferOutput<
	typeof LocationByTypeQuerySchema
>;

export class ByTypeQueryDto extends ValibotDto(LocationByTypeQuerySchema) {}
