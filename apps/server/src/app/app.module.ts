import { Module } from '@nestjs/common';
import { ServerDeitiesModule } from '@unteris/server/deities';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ServerDeitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
