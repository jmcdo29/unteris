import { Output, pick } from "valibot";
import { LocationSchema } from "../location";

export const LocationByTypeQuerySchema = pick(LocationSchema, ["type"]);

export type LocationByTypeQuery = Output<typeof LocationByTypeQuerySchema>;
