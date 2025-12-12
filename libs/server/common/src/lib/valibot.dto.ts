import { TypeschemaDto } from "@nest-lab/typeschema";
import type { ObjectSchema, OptionalSchema } from "valibot";
import { schemaToOpenAPI } from "./valibot-to-openapi";

// biome-ignore lint/suspicious/noExplicitAny: Valibot required any here
type Object = ObjectSchema<Record<string, any>>;

export const ValibotDto: <T extends Object | OptionalSchema<Object>>(
	schema: T,
) => ReturnType<typeof TypeschemaDto<T>> = (schema) => {
	class DtoSchema extends TypeschemaDto(schema) {
		static override OPENAPI_METADATA = schemaToOpenAPI(schema);
	}
	return DtoSchema;
};
