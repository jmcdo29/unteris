import type { Type } from "@nestjs/common";
<<<<<<< HEAD
import type {
	BaseIssue,
	BaseSchema,
	Config,
	OutputDataset,
	StandardProps,
	UnknownDataset,
} from "valibot";
=======
import type { ObjectSchema, OptionalSchema } from "valibot";
>>>>>>> 6631869 (chore: update code for biome rules)

type ValibotObject = {
	type: "object";
	entries: Record<string, ValibotSchemaObject>;
};

type ValibotArray = {
	type: "array";
	item: ValibotSchemaObject;
};

type ValibotString = {
	type: "string";
};

type ValibotNumber = {
	type: "number";
};

type ValibotBoolean = {
	type: "boolean";
};

type ValibotOptional = {
	type: "optional";
	wrapped: ValibotSchemaObject;
};

type ValibotNullish = {
	type: "nullish";
	wrapped: ValibotSchemaObject;
};

type ValibotNullable = {
	type: "nullable";
	wrapped: ValibotSchemaObject;
};

type ValibotEnum = {
	type: "enum";
	enum: string[];
};

type ValibotInstance = {
	type: "instance";
	class?: Type<unknown>;
};

type ValibotLiteral = {
	type: "literal";
	literal: string | boolean | number;
};

type ValibotDate = {
	type: "date";
};

type ValibotUnion = {
	type: "union";
	options: ValibotSchemaObject[];
};

type ValibotIntersect = {
	type: "intersect";
	options: ValibotSchemaObject[];
};

type ValibotStrictObject = {
	type: "strict_object";
	entries: Record<string, ValibotSchemaObject>;
};

type ValibotVariant = {
	type: "variant";
	options: ValibotSchemaObject[];
	key: string;
};

type ValibotPicklist = {
	type: "picklist";
	options: (string | number | boolean)[];
};

type ValibotSchemaObject = {
	kind: "schema";
	reference: (
		// biome-ignore lint/suspicious/noExplicitAny: valibot issues
		...args: any[]
	) => BaseSchema<unknown, unknown, BaseIssue<unknown>>;
	async: false;
	expects: string;
	message?: string;
} & (
	| ValibotArray
	| ValibotBoolean
	| ValibotEnum
	| ValibotInstance
	| ValibotNullable
	| ValibotNullish
	| ValibotNumber
	| ValibotObject
	| ValibotOptional
	| ValibotPicklist
	| ValibotString
	| ValibotLiteral
	| ValibotDate
	| ValibotUnion
	| ValibotIntersect
	| ValibotStrictObject
	| ValibotVariant
);

export type Object = ValibotSchemaObject &
	({ type: "object" } | { type: "strict_object" }) & {
		"~run": (
			dataset: UnknownDataset,
			config: Config<BaseIssue<unknown>>,
		) => OutputDataset<unknown, BaseIssue<unknown>>;
		"~standard": StandardProps<unknown, unknown>;
	};

const getType = (
	schema: ValibotSchemaObject,
): {
	type: (() => Type<unknown>) | string | undefined;
	required?: boolean;
	format?: string;
	enum?: (string | number | boolean)[];
	properties?: Record<string, unknown>;
	items?: Record<string, unknown>;
	anyOf?: Array<{
		type: string;
		enum?: string[];
		properties?: Record<string, unknown>;
		items?: Record<string, unknown>;
	}>;
	allOf?: Array<{
		type: string;
		enum?: string[];
		properties?: Record<string, unknown>;
		items?: Record<string, unknown>;
	}>;
} => {
	switch (schema.type) {
		case "string":
<<<<<<< HEAD
			return { type: "string" };
		case "number":
			return { type: "number" };
		case "strict_object":
		case "object": {
			const props: Record<string, unknown> = {};
			for (const key in schema.entries) {
				props[key] = getType(schema.entries?.[key]);
			}
			return {
				type: "object",
				properties: props,
			};
		}
		case "array": {
			return { type: "array", items: getType(schema.item) };
		}
		case "boolean":
			return { type: "boolean" };
		case "literal": {
			const type = typeof schema.literal;
			const val = schema.literal;
			return { type, enum: [val] };
		}
=======
			return { type: (): StringConstructor => String };
		case "number":
			return { type: (): NumberConstructor => Number };
		case "object":
			return { type: (): ObjectConstructor => Object };
		case "boolean":
			return { type: (): BooleanConstructor => Boolean };
>>>>>>> 6631869 (chore: update code for biome rules)
		case "optional":
		case "nullable":
		case "nullish":
			return {
				required: false,
				...getType(schema.wrapped),
			};
		case "picklist":
			return { type: "string", enum: Array.from(schema.options) ?? [] };
		case "enum":
			return {
<<<<<<< HEAD
				type: "string",
=======
				type: (): StringConstructor => String,
>>>>>>> 6631869 (chore: update code for biome rules)
				enum: schema.enum ?? [],
			};
		case "instance": {
			let type: { type: (() => Type<unknown>) | string; format?: string } = {
				type: () => Object,
			};
			if (schema.class && schema.class.name === "Buffer") {
<<<<<<< HEAD
				type = { type: "string", format: "binary" };
			} else if (schema.class) {
				const schemaClass = schema.class;
				type = { type: () => schemaClass };
			} else {
				type = { type: "string" };
			}
			return type;
		}
		case "date": {
			return { type: "string", format: "date" };
		}
		case "variant":
		case "union": {
			const types = new Set<string>();
			const vals = [];
			for (const unionVal of schema.options) {
				types.add(unionVal.type);
				if (unionVal.type === "literal") {
					vals.push(unionVal.literal);
				}
			}
			let retSchema:
				| { type: string; enum: string[] }
				| {
						type: undefined;
						anyOf: Array<{ type: string } & Record<string, unknown>>;
				  };
			if (types.size === 1 && types.has("literal")) {
				retSchema = {
					type: schema.options[0].type,
					enum: vals.map((v) => v.toString()),
				};
			} else {
				retSchema = { type: undefined, anyOf: [] };
				for (const unionVal of schema.options) {
					const schemaPart = getType(unionVal) as unknown as {
						type: string;
					} & Record<string, unknown>;
					retSchema.anyOf.push(schemaPart);
				}
			}
			return retSchema;
		}
		case "intersect": {
			const types = new Set<string>();
			const vals = [];
			for (const intersectVal of schema.options) {
				types.add(intersectVal.type);
				if (intersectVal.type === "literal") {
					vals.push(intersectVal.literal);
				}
			}
			let retSchema: {
				type: undefined;
				allOf: Array<{ type: string } & Record<string, unknown>>;
			};
			retSchema = { type: undefined, allOf: [] };
			for (const intersectVal of schema.options) {
				const schemaPart = getType(intersectVal) as unknown as {
					type: string;
				} & Record<string, unknown>;
				retSchema.allOf.push(schemaPart);
			}
			return retSchema;
		}
=======
				return { type: (): StringConstructor => String, format: "binary" };
			}
			if (schema.class) {
				const schemaClass = schema.class;
				return { type: (): Type<unknown> => schemaClass };
			}
			return { type: (): StringConstructor => String };
>>>>>>> 6631869 (chore: update code for biome rules)
		default:
			// @ts-expect-error there are still uncovered cases
			throw new Error(`Unknown Type: "${schema.type}"`);
	}
};
export const schemaToOpenAPI = (
	schema: ValibotObject | ValibotOptional | ValibotStrictObject,
): Record<string, unknown> => {
	if (schema.type === "optional") {
		// @ts-expect-error I hate using this so much, but it's kinda required for now
		return { required: false, ...schemaToOpenAPI(schema.wrapped) };
	}
	const valibotSchema = schema.entries;
	const schemaObj: Record<string, unknown> = {};
	const schemaKeys = Object.keys(valibotSchema);
	for (const schemaKey of schemaKeys) {
<<<<<<< HEAD
		const currSchema = valibotSchema[schemaKey as keyof typeof valibotSchema];
		schemaObj[schemaKey] = getType(currSchema);
=======
		schemaObj[schemaKey] = getType(
			valibotSchema[schemaKey as keyof typeof valibotSchema],
		);
>>>>>>> 6631869 (chore: update code for biome rules)
	}
	return schemaObj;
};
