import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { PasswordResetSchema } from "@unteris/shared/types";

export class PasswordResetDto extends TypeschemaDto(PasswordResetSchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(PasswordResetSchema);
}
