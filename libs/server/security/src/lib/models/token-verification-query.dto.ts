import { ZodDtoClass } from "@unteris/server/zod-pipe";
import { z } from "zod";
const tokenVerificationSchema = z.object({
	verificationToken: z.string().length(32),
});

export class TokenVerificationData extends ZodDtoClass<
	typeof tokenVerificationSchema
> {
	static override schema = tokenVerificationSchema;
}
