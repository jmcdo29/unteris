import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {
	ServerConfigModule,
	ServerConfigService,
} from "@unteris/server/config";
import { ImageClientController } from "./image-client.controller";
import { ServerImageClientService } from "./image-client.service";

@Module({
	imports: [ServerConfigModule],
	providers: [
		ServerImageClientService,
		{
			provide: "IMAGE_SERVER_CLIENT",
			inject: [ServerConfigService],
			useFactory: (config: ServerConfigService) =>
				ClientProxyFactory.create({
					transport: Transport.RMQ,
					options: {
						urls: [
							`amqp://${config.get("RABBIT_USER")}:${config.get(
								"RABBIT_PASSWORD",
							)}@${config.get("RABBIT_HOST")}:${config.get("RABBIT_PORT")}`,
						],
						queue: "",
						queueOptions: {
							durable: true,
						},
					},
				}),
		},
	],
	controllers: [ImageClientController],
	exports: [ServerImageClientService],
})
export class ServerImageClientModule {}
