import { Inject, Module } from '@nestjs/common';
import {
  ServerConfigModule,
  ServerConfigService,
} from '@unteris/server/config';
import { CamelCasePlugin, Kysely, KyselyConfig, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import {
  getKyselyConfigToken,
  getKyselyInstanceToken,
} from './kysely.constants';

@Module({
  imports: [ServerConfigModule],
  controllers: [],
  providers: [
    {
      provide: getKyselyConfigToken(),
      inject: [ServerConfigService],
      useFactory: (config: ServerConfigService): KyselyConfig => ({
        dialect: new PostgresDialect({
          pool: new Pool({
            host: config.get('DATABASE_HOST'),
            port: config.get('DATABASE_PORT'),
            database: config.get('DATABASE_NAME'),
            user: config.get('DATABASE_USER'),
            password: config.get('DATABASE_PASSWORD'),
          }),
        }),
        plugins: [new CamelCasePlugin()],
      }),
    },
    {
      provide: getKyselyInstanceToken(),
      useFactory: (config: KyselyConfig) => {
        return new Kysely(config);
      },
      inject: [getKyselyConfigToken()],
    },
  ],
  exports: [getKyselyInstanceToken()],
})
export class KyselyModule {
  constructor(
    @Inject(getKyselyInstanceToken()) private readonly kysely: Kysely<any>
  ) {}

  async onModuleDestroy() {
    await this.kysely.destroy();
  }
}
