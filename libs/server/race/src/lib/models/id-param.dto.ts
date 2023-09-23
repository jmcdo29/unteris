import { ZodDtoClass } from "@unteris/server/zod-pipe";
import { IdParamSchema } from "@unteris/shared/types";

export class IdParamDto extends ZodDtoClass<typeof IdParamSchema> {
	static override schema = IdParamSchema;
}
