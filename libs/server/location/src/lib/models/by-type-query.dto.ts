import { ValibotDto } from "@unteris/server/common";
import { LocationByTypeQuerySchema } from "@unteris/shared/types";

export class ByTypeQueryDto extends ValibotDto(LocationByTypeQuerySchema) {}
