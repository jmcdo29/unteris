import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { getKyselyInstanceToken } from '@unteris/server/kysely';
import { RootModule } from '@unteris/server/root';
import { request } from 'pactum';
import { describe, beforeAll, beforeEach } from 'vitest';
import { DbContext } from './interfaces/test-context.interface';
import { csrfTest } from './tests/csrf';
import { signUpAndLoginTests } from './tests/signup-and-login';

describe('Unteris E2E test suite', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await NestFactory.create(RootModule, { bufferLogs: true });
    app.useLogger(app.get(OgmaService));
    await app.listen(0);
    const reqURL = await app.getUrl();
    request.setBaseUrl(reqURL.replace('[::1]', 'localhost'));
    return async () => {
      await app.close();
    };
  });
  beforeEach<DbContext>((context) => {
    context.db = app.get(getKyselyInstanceToken(), { strict: false });
  });
  csrfTest();
  signUpAndLoginTests();
});
