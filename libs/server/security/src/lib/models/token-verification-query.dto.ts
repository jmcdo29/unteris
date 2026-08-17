import { ValibotDto } from "@unteris/server/common";
import * as v from "valibot";

const tokenVerificationSchema = v.object({
	verificationToken: v.pipe(v.string(), v.length(32)),
});

export class TokenVerificationData extends ValibotDto(
	tokenVerificationSchema,
) {}
