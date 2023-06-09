import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { RootModule } from '@unteris/server/root';
import { request, spec } from 'pactum';
import { suite } from 'uvu';
import { csrfTests } from './tests/csrf';

type UvuContext = { app: INestApplication };

const ApplicationE2E = suite<UvuContext>('Unteris E2E test suite');

ApplicationE2E.before(async (context) => {
  const app = await NestFactory.create(RootModule, { bufferLogs: true });
  app.useLogger(app.get(OgmaService));
  await app.listen(0);
  const reqURL = await app.getUrl();
  request.setBaseUrl(reqURL.replace('[::1]', 'localhost'));
  context.app = app;
});

ApplicationE2E.after(async ({ app }) => {
  await app.close();
});

ApplicationE2E('CSRF Testing', csrfTests);

ApplicationE2E.run();
