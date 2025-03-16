import type { Type } from "@nestjs/common";
import type { ObjectSchema, OptionalSchema } from "valibot";

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
			return { type: (): StringConstructor => String };
		case "number":
			return { type: (): NumberConstructor => Number };
		case "object":
			return { type: (): ObjectConstructor => Object };
		case "boolean":
			return { type: (): BooleanConstructor => Boolean };
		case "optional":
			return {
				required: false,
				...getType(schema.wrapped ?? { schema: "unknown" }),
			};
		case "enum":
			return {
				type: (): StringConstructor => String,
				enum: schema.enum ?? [],
			};
		case "instance":
			if (schema.class && schema.class.name === "Buffer") {
				return { type: (): StringConstructor => String, format: "binary" };
			}
			if (schema.class) {
				const schemaClass = schema.class;
				return { type: (): Type<unknown> => schemaClass };
			}
			return { type: (): StringConstructor => String };
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
	for (const schemaKey of schemaKeys) {
		schemaObj[schemaKey] = getType(
			valibotSchema[schemaKey as keyof typeof valibotSchema],
		);
	}
	return schemaObj;
};
