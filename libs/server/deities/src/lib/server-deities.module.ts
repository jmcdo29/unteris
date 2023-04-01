import { Module } from '@nestjs/common';
import { ServerDeitiesController } from './server-deities.controller';
import { ServerDeitiesService } from './server-deities.service';

@Module({
  controllers: [ServerDeitiesController],
  providers: [ServerDeitiesService],
  exports: [ServerDeitiesService],
})
export class ServerDeitiesModule {}
