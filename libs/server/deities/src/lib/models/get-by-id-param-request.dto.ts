import { IdParamSchema, ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

export type IdParam = v.InferOutput<typeof IdParamSchema>;

export class GetDeityByIdParamDto extends ValibotDto(IdParamSchema) {}
