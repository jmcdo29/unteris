import { ZodDtoClass } from "@unteris/server/zod-pipe";
import { CategoryParamSchema } from "@unteris/shared/types";

export class CategoryParamDto extends ZodDtoClass<typeof CategoryParamSchema> {
	static override schema = CategoryParamSchema;
}
