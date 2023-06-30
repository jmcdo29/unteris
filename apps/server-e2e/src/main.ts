import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { RootModule } from '@unteris/server/root';
import { request, spec } from 'pactum';
import { describe, beforeAll } from 'vitest';
import { csrfTest } from './tests/csrf';

describe('Unteris E2E test suite', () => {
  beforeAll(async () => {
    const app = await NestFactory.create(RootModule, { bufferLogs: true });
    app.useLogger(app.get(OgmaService));
    await app.listen(0);
    const reqURL = await app.getUrl();
    request.setBaseUrl(reqURL.replace('[::1]', 'localhost'));
    return async () => {
      await app.close();
    };
  });
  csrfTest();
});
