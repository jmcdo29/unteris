import { ConsoleLogger } from "@nestjs/common";
import { CommandFactory } from "nest-commander";
import { AppModule } from "./app/app.module";

async function bootstrap(): Promise<void> {
	await CommandFactory.run(AppModule, {
		bufferLogs: true,
		logger: new ConsoleLogger(),
	});
}

bootstrap();
