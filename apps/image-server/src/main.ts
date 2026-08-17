import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { OgmaService } from "@ogma/nestjs-module";

import { ImageRootModule } from "@unteris/server/image-root";

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ImageRootModule, {
		bufferLogs: true,
		transport: Transport.RMQ,
		options: {
			urls: [
				`amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
			],
			queue: "",
			queueOptions: {
				durable: true,
			},
		},
	});
	const logger = app.get(OgmaService);
	app.useLogger(logger);
	await app.listen();
	logger.log("🚀 Image Processing Server up and running!");
}

bootstrap();
