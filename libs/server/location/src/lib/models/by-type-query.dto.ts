import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { LocationByTypeQuerySchema } from "@unteris/shared/types";

export class ByTypeQueryDto extends TypeschemaDto(LocationByTypeQuerySchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(LocationByTypeQuerySchema);
}
