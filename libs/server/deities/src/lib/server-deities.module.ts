import { Module } from '@nestjs/common';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerDeitiesController } from './server-deities.controller';
import { ServerDeitiesService } from './server-deities.service';

@Module({
  imports: [KyselyModule],
  controllers: [ServerDeitiesController],
  providers: [ServerDeitiesService],
  exports: [ServerDeitiesService],
})
export class ServerDeitiesModule {}
