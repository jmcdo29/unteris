import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { LoginBodySchema } from "@unteris/shared/types";

export class LoginBodyDto extends TypeschemaDto(LoginBodySchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(LoginBodySchema);
}
