import { ZodDtoClass } from "@unteris/server/zod-pipe";
import { PasswordResetSchema } from "@unteris/shared/types";

export class PasswordResetDto extends ZodDtoClass<typeof PasswordResetSchema> {
	static override schema = PasswordResetSchema;
}
