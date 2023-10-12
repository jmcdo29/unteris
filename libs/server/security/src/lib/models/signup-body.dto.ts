import { TypeschemaDto } from "@nest-lab/typeschema";
import { schemaToOpenAPI } from "@unteris/server/common";
import { SignupSchema } from "@unteris/shared/types";

export class SignupBody extends TypeschemaDto(SignupSchema) {
	static override OPENAPI_METADATA = schemaToOpenAPI(SignupSchema);
}
