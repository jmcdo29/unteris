import { IncomingMessage } from "node:http";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { parse } from "useragent-ng";
import * as v from "valibot";
import { ValibotDto } from "./valibot.dto";

const ReqMetaSchema = v.object({
	userAgent: v.string(),
	operatingSystem: v.string(),
	ip: v.string(),
});

export type ReqMetaType = v.Output<typeof ReqMetaSchema>;

export class ReqMetaDto extends ValibotDto(ReqMetaSchema) {}

export const ReqMeta = createParamDecorator(
	(_: never, context: ExecutionContext): ReqMetaType => {
		const req = context.switchToHttp().getRequest<IncomingMessage>();
		const uaString = req.headers["user-agent"];
		const ua = parse(uaString);
		const ip = req.socket.address();
		return {
			userAgent: ua.family,
			operatingSystem: ua.os.family,
			ip: "address" in ip ? ip.address : "unknown",
		};
	},
);
