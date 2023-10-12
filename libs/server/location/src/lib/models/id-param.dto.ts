import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { IdParamSchema } from "@unteris/shared/types";

export class IdParamDto extends TypeschemaDto(IdParamSchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(IdParamSchema);
}
