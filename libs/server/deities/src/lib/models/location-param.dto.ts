import { ValibotDto } from "@unteris/server/common";
import { LocationParamSchema } from "@unteris/shared/types";

export class LocationParamDto extends ValibotDto(LocationParamSchema) {}
