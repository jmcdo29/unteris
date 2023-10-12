import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { LocationParamSchema } from "@unteris/shared/types";

export class LocationParamDto extends TypeschemaDto(LocationParamSchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(LocationParamSchema);
}
