import { Module } from '@nestjs/common';
import { ServerConfigModule } from '@unteris/server/config';
import { ServerRedisModule } from '@unteris/server/redis';
import { ServerTokenModule } from '@unteris/server/token';
import { SessionController } from './session.controller';
import { ServerSessionService } from './session.service';

@Module({
  imports: [ServerRedisModule, ServerConfigModule, ServerTokenModule],
  controllers: [SessionController],
  providers: [ServerSessionService],
  exports: [ServerSessionService],
})
export class ServerSessionModule {}
