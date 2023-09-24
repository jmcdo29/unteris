import { TypeschemaDto } from "@nest-lab/typeschema";
import { PasswordResetRequestSchema } from "@unteris/shared/types";

export class PasswordResetRequestDto extends TypeschemaDto(
	PasswordResetRequestSchema,
) {}
