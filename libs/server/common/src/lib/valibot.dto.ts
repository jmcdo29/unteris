import { TypeschemaDto } from "@nest-lab/typeschema";
import * as v from "valibot";

import { schemaToOpenAPI, Object as ValibotObject } from "./valibot-to-openapi";

export const ValibotDto: <
	T extends ValibotObject | v.OptionalSchema<ValibotObject, unknown>,
>(
	schema: T,
) => {
	// these are necessary to allow us to use body.data or similar in a controller
	// after running the schema through a pipe for validation
	new (
		// @ts-expect-error complex types at play here
		parsed: v.InferOutput<typeof schema>,
	): {
		// @ts-expect-error complex types at play here
		data: v.InferOutput<typeof schema>;
	};
	schema: typeof schema;
} = (schema) => {
	class DtoSchema extends TypeschemaDto(schema) {
		static _OPENAPI_METADATA_FACTORY = () => schemaToOpenAPI(schema);
	}
	return DtoSchema;
};
