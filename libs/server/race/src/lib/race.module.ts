import { Module } from '@nestjs/common';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerRaceController } from './race.controller';
import { ServerRaceService } from './race.service';

@Module({
  imports: [KyselyModule],
  controllers: [ServerRaceController],
  providers: [ServerRaceService],
  exports: [ServerRaceService],
})
export class ServerRaceModule {}
