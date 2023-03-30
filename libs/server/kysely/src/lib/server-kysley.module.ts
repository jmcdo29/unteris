import { Module } from '@nestjs/common';
import { Kysely, KyselyConfig, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import {
  getKyselyConfigToken,
  getKyselyInstanceToken,
} from './kysely.constants';

@Module({
  controllers: [],
  providers: [
    {
      provide: getKyselyConfigToken(),
      useFactory: (): KyselyConfig => ({
        dialect: new PostgresDialect({
          pool: new Pool({
            host: 'localhost',
            port: 5432,
            database: 'unteris',
          }),
        }),
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
export class KyselyModule {}
