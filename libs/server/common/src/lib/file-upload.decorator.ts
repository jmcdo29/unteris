import { applyDecorators, type Type, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
	ApiBody,
	ApiConsumes,
	ApiExtraModels,
	getSchemaPath,
} from "@nestjs/swagger";

/**
 * This is a composite decorator that applies the proper swagger metadata for
 * file uploads while still allowing for documentation of the request.
 *
 * Swagger support for file upload requires _at least_ two extra decorators,
 * and in many cases of the server, three, as it will require the
 * `@ApiConsumes()`, `@ApiExtraModels()`, and `@ApiBody()` decorators, with a
 * rather large metadata object passed to `@ApiBody()`. Rather than re-create
 * this several times over, it was easier to make a simple, easily maintainable
 * abstraction that handles this.
 *
 * ---
 * @param fileProperty the property of the request that should contain the file
 * @param bodyDto The Body type of the request for swagger documentation
 * @returns
 */
export const FileUpload = (
	fileProperty: string,
	bodyDto: Type<unknown>,
): MethodDecorator =>
	applyDecorators(
		ApiConsumes("multipart/form-data", "application/json"),
		ApiExtraModels(bodyDto),
		ApiBody({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(bodyDto) },
					{
						type: "object",
						properties: {
							[fileProperty]: {
								type: "string",
								format: "binary",
							},
						},
					},
				],
			},
		}),
		UseInterceptors(FileInterceptor(fileProperty)),
	);
