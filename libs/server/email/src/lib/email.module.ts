import { Module } from "@nestjs/common";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";
import { TransportOptions, createTransport } from "nodemailer";
import {
	EMAIL_CONFIG_TOKEN,
	EMAIL_INSTANCE_TOKEN,
	getEmailConfigToken,
} from "./email.constants";
import { ServerEmailService } from "./email.service";

@Module({
	imports: [ServerConfigModule],
	controllers: [],
	providers: [
		{
			provide: EMAIL_CONFIG_TOKEN,
			useFactory: (config: ServerConfigService) => {
				console.log(config.get("NODE_ENV"));
				if (config.get("NODE_ENV") === "test") {
					return { jsonTransport: true };
				}
				return {
					pool: true,
					host: config.get("SMTP_HOST"),
					auth: {
						user: config.get("NOREPLY_EMAIL"),
						pass: config.get("SMTP_PASS"),
					},
				};
			},
			inject: [ServerConfigService],
		},
		{
			provide: EMAIL_INSTANCE_TOKEN,
			useFactory: (config: TransportOptions) => createTransport(config),
			inject: [getEmailConfigToken()],
		},
		ServerEmailService,
	],
	exports: [ServerEmailService],
})
export class ServerEmailModule {}
