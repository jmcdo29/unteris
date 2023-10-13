import { ValibotDto } from "@unteris/server/common";
import { length, object, string } from "valibot";
const tokenVerificationSchema = object({
	verificationToken: string([length(32)]),
});

export class TokenVerificationData extends ValibotDto(
	tokenVerificationSchema,
) {}
