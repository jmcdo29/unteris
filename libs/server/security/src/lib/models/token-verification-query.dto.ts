import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { length, object, string } from "valibot";
const tokenVerificationSchema = object({
	verificationToken: string([length(32)]),
});

export class TokenVerificationData extends TypeschemaDto(
	tokenVerificationSchema,
) {
	static override OPENAPI_METADATA = schemaToOpenAPI(tokenVerificationSchema);
}
