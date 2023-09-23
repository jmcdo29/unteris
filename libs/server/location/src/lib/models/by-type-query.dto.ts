import { ZodDtoClass } from "@unteris/server/zod-pipe";
import { LocationByTypeQuerySchema } from "@unteris/shared/types";

export class ByTypeQueryDto extends ZodDtoClass<
	typeof LocationByTypeQuerySchema
> {
	static schema = LocationByTypeQuerySchema;
}
