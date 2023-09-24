import { TypeschemaDto } from "@nest-lab/typeschema";
import { LocationByTypeQuerySchema } from "@unteris/shared/types";

export class ByTypeQueryDto extends TypeschemaDto(LocationByTypeQuerySchema) {
	static schema = LocationByTypeQuerySchema;
}
