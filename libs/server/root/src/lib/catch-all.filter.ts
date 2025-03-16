import { type ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter, type HttpAdapterHost } from "@nestjs/core";
import type { OgmaFilterService } from "@ogma/nestjs-module";

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
