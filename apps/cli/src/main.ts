import { CommandFactory } from "nest-commander";

import { ConsoleLogger, Logger } from "@nestjs/common";
import { AppModule } from "./app/app.module";

async function bootstrap() {
	await CommandFactory.run(AppModule, {
		bufferLogs: true,
	});
}

bootstrap();
