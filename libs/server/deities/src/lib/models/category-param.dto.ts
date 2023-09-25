import { TypeschemaDto } from "@nest-lab/typeschema";
import { CategoryParamSchema } from "@unteris/shared/types";

export class CategoryParamDto extends TypeschemaDto(CategoryParamSchema) {}
