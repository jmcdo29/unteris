import * as v from "valibot";
import { ValibotDto } from "./valibot.dto";

export const IdParamSchema = v.object({
	id: v.pipe(v.string(), v.ulid()),
});

export type IdParam = v.InferOutput<typeof IdParamSchema>;

export class IdParamDto extends ValibotDto(IdParamSchema) {}
