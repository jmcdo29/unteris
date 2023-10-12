import { AnySchema, ObjectSchema } from "valibot";

const getType = (schema: {
	schema: string;
	enum?: string[];
	wrapped?: { schema: string };
}): {
	// biome-ignore lint/complexity/noBannedTypes: @nestjs/swagger requires a Function
	type: () => Function;
	required?: boolean;
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
		default:
			throw new Error(`Unknown Type: "${schema.schema}"`);
	}
};

// biome-ignore lint/suspicious/noExplicitAny: valibot needs any here
export const schemaToOpenAPI = (schema: ObjectSchema<Record<string, any>>) => {
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
