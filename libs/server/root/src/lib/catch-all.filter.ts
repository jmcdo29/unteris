import { type ArgumentsHost, Catch } from "@nestjs/common";
<<<<<<< HEAD
import { BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";
import { OgmaFilterService } from "@ogma/nestjs-module";
=======
import { BaseExceptionFilter, type HttpAdapterHost } from "@nestjs/core";
import type { OgmaFilterService } from "@ogma/nestjs-module";
>>>>>>> 6631869 (chore: update code for biome rules)

@Catch()
export class BaseFilter extends BaseExceptionFilter {
	constructor(
		private readonly logger: OgmaFilterService,
		host: HttpAdapterHost,
	) {
		super(host.httpAdapter.getHttpServer());
	}

	override catch(exception: Error, host: ArgumentsHost): void {
		this.logger.log(exception, host);
		super.catch(exception, host);
	}
}
