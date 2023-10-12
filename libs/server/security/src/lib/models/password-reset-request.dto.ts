import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { PasswordResetRequestSchema } from "@unteris/shared/types";

export class PasswordResetRequestDto extends TypeschemaDto(
	PasswordResetRequestSchema,
) {
	static override OPENAPI_METADATA = schemaToOpenAPI(
		PasswordResetRequestSchema,
	);
}
