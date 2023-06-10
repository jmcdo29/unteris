import { Module } from '@nestjs/common';
import { ServerRaceController } from './race.controller';
import { ServerRaceService } from './race.service';

@Module({
  controllers: [ServerRaceController],
  providers: [ServerRaceService],
  exports: [ServerRaceService],
})
export class ServerRaceModule {}
