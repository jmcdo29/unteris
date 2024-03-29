import { NestFactory } from "@nestjs/core";
import { OgmaService } from "@ogma/nestjs-module";
import { ServerConfigService } from "@unteris/server/config";
import { RootModule } from "@unteris/server/root";

async function bootstrap() {
	const app = await NestFactory.create(RootModule, { bufferLogs: true });
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);
	const logger = app.get(OgmaService);
	app.useLogger(logger);
	const config = app.get(ServerConfigService);
	const port = process.env.PORT || 3333;
	app.enableCors({
		origin: [config.get("CORS")],
		credentials: true,
	});
	app.getHttpAdapter().getInstance().set("trust proxy", true);
	await app.listen(port, () => {
		logger.log(`🚀 Listening at http://localhost:${port}/${globalPrefix}`);
	});
}

bootstrap();
