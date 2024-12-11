import { ValibotDto } from "@unteris/server/common";
import { LocationCreationSchema } from "@unteris/shared/types";

export class LocationCreationDto extends ValibotDto(LocationCreationSchema) {}
