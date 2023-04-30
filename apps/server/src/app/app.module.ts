import { Module } from '@nestjs/common';
import { ServerDeitiesModule } from '@unteris/server/deities';
import { ServerLocationModule } from '@unteris/server/location';
import { ServerLoggingModule } from '@unteris/server/logging';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServerDeitiesModule,
    ServerLocationModule,
    ServerLoggingModule.forApplication('Unteris Server', 'DEBUG'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
