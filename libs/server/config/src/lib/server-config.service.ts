import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';

import { SCHEMA } from './config.constants';
import { Config } from './config.schema';

@Injectable()
export class ServerConfigService {
  private readonly config: z.infer<typeof Config>;

  constructor(@Inject(SCHEMA) schema: typeof Config) {
    this.config = schema.parse(process.env);
    if (this.config.NODE_ENV === 'production') {
      schema.required({
        NOREPLY_EMAIL: true,
        SMTP_HOST: true,
        SMTP_PASS: true,
      });
      this.config = schema.parse(this.config);
    }
  }

  get<T extends keyof z.infer<typeof Config>>(
    key: T
  ): z.infer<typeof Config>[T] {
    return this.config[key];
  }

  getServerHost(): string {
    return this.config.NODE_ENV === 'production'
      ? 'https://unteris.com'
      : 'http://localhost:3333';
  }
}
