import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { OgmaFilterService, OgmaLogger } from '@ogma/nestjs-module';

@Catch()
export class BaseFilter extends BaseExceptionFilter {
  constructor(
    private readonly logger: OgmaFilterService,
    private readonly host: HttpAdapterHost
  ) {
    super(host.httpAdapter.getHttpServer());
  }

  override catch(exception: any, host: ArgumentsHost): void {
    this.logger.log(exception, host);
    super.catch(exception, host);
  }
}
