import { ValibotDto } from "@unteris/server/common";
import { CategoryParamSchema } from "@unteris/shared/types";

export class CategoryParamDto extends ValibotDto(CategoryParamSchema) {}
