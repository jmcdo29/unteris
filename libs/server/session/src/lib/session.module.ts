import { Module } from '@nestjs/common';
import { ServerConfigModule } from '@unteris/server/config';
import { ServerRedisModule } from '@unteris/server/redis';
import { ServerSessionService } from './session.service';

@Module({
  imports: [ServerRedisModule, ServerConfigModule],
  controllers: [],
  providers: [ServerSessionService],
  exports: [],
})
export class ServerSessionModule {}
