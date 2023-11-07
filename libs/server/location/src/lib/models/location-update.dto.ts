import { ValibotDto } from "@unteris/server/common";
import { LocationUpdateSchema } from "@unteris/shared/types";

export class LocationUpdateDto extends ValibotDto(LocationUpdateSchema) {}
