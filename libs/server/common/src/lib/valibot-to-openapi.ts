import { Type } from "@nestjs/common";
import { ObjectSchema, OptionalSchema } from "valibot";

// biome-ignore lint/suspicious/noExplicitAny: valibot needs any here
type Object = ObjectSchema<Record<string, any>>;

const getType = (schema: {
	schema: string;
	enum?: string[];
	wrapped?: { schema: string };
	class?: Type<unknown>;
}): {
	type: () => Type<unknown>;
	required?: boolean;
	format?: string;
	enum?: string[];
} => {
	switch (schema.schema) {
		case "string":
			return { type: () => String };
		case "number":
			return { type: () => Number };
		case "object":
			return { type: () => Object };
		case "boolean":
			return { type: () => Boolean };
		case "optional":
			return {
				required: false,
				...getType(schema.wrapped ?? { schema: "unknown" }),
			};
		case "enum":
			return {
				type: () => String,
				enum: schema.enum ?? [],
			};
		case "instance":
			if (schema.class && schema.class.name === "Buffer") {
				return { type: () => String, format: "binary" };
			} else if (schema.class) {
				const schemaClass = schema.class;
				return { type: () => schemaClass };
			} else {
				return { type: () => String };
			}
		default:
			throw new Error(`Unknown Type: "${schema.schema}"`);
	}
};
export const schemaToOpenAPI = (
	schema: Object | OptionalSchema<Object>,
): Record<string, unknown> => {
	if (schema.schema === "optional") {
		return { required: false, ...schemaToOpenAPI(schema.wrapped) };
	}
	const valibotSchema = schema.object;
	const schemaObj: Record<string, unknown> = {};
	const schemaKeys = Object.keys(valibotSchema);
	schemaKeys.forEach((schemaKey) => {
		schemaObj[schemaKey] = getType(
			valibotSchema[schemaKey as keyof typeof valibotSchema],
		);
	});
	return schemaObj;
};
