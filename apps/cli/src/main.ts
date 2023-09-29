import { CommandFactory } from "nest-commander";

import { AppModule } from "./app/app.module";
import { ConsoleLogger, Logger } from "@nestjs/common";

async function bootstrap() {
	await CommandFactory.run(AppModule, {
		bufferLogs: true,
	});
}

bootstrap();
