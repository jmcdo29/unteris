import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { OgmaFilterService } from '@ogma/nestjs-module';

@Catch()
export class BaseFilter extends BaseExceptionFilter {
	constructor(
		private readonly logger: OgmaFilterService,
		host: HttpAdapterHost
	) {
		super(host.httpAdapter.getHttpServer());
	}

	override catch(exception: Error, host: ArgumentsHost): void {
		this.logger.log(exception, host);
		super.catch(exception, host);
	}
}
