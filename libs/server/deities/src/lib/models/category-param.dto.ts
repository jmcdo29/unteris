import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { CategoryParamSchema } from "@unteris/shared/types";

export class CategoryParamDto extends TypeschemaDto(CategoryParamSchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(CategoryParamSchema);
}
