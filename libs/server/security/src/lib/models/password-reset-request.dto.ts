import { ValibotDto } from "@unteris/server/common";
import { PasswordResetRequestSchema } from "@unteris/shared/types";

export class PasswordResetRequestDto extends ValibotDto(
	PasswordResetRequestSchema,
) {}
