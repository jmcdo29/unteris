import { Module } from '@nestjs/common';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerLoggingModule } from '@unteris/server/logging';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServerLoggingModule.forApplication('Unteris Image', 'DEBUG'),
    KyselyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ImageRootModule {}
