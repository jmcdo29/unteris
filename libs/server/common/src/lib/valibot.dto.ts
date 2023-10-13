import { TypeschemaDto } from "@nest-lab/typeschema";
import { ObjectSchema } from "valibot";
import { schemaToOpenAPI } from "./valibot-to-openapi";

// biome-ignore lint/suspicious/noExplicitAny: valibot requires any here
export const ValibotDto: <T extends ObjectSchema<Record<string, any>>>(
	schema: T,
) => ReturnType<typeof TypeschemaDto<T>> = (schema) => {
	class DtoSchema extends TypeschemaDto(schema) {
		static override OPENAPI_METADATA = schemaToOpenAPI(schema);
	}
	return DtoSchema;
};
