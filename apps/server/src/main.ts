import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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
	const openApiConfig = new DocumentBuilder()
		.setTitle("Unteris API")
		.setDescription("The API for the Unteris.com website.")
		.setVersion("1.0.0")
		.addCookieAuth("sessionId")
		.addTag("Deity", "Information about the deities of the world")
		.addTag("Location", "How to find out more about the places in Unteris")
		.addTag("Race", "Custom races that exist amongst the land")
		.addTag("Security", "This should be self explanatory")
		.build();
	const document = SwaggerModule.createDocument(app, openApiConfig);
	SwaggerModule.setup("open-api", app, document);
	app.getHttpAdapter().getInstance().set("trust proxy", true);
	await app.listen(port, () => {
		logger.log(`🚀 Listening at http://localhost:${port}/${globalPrefix}`);
	});
}

bootstrap();
