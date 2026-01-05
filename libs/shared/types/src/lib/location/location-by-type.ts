import * as v from "valibot";

import { LocationSchema } from "../location";

export const LocationByTypeQuerySchema = v.pick(LocationSchema, ["type"]);

export type LocationByTypeQuery = v.InferOutput<
	typeof LocationByTypeQuerySchema
>;
