import { z } from "zod";
import { LocationSchema } from "../location";

export const LocationByTypeQuerySchema = LocationSchema.pick({ type: true });

export type LocationByTypeQuery = z.infer<typeof LocationByTypeQuerySchema>;
