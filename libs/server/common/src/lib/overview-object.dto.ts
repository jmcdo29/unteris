import * as v from "valibot";
import { ValibotDto } from "./valibot.dto";

export const OverviewObjectSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
	name: v.string(),
});

export type OverviewObject = v.InferOutput<typeof OverviewObjectSchema>;

export class OverviewObjectDto extends ValibotDto(OverviewObjectSchema) {}
