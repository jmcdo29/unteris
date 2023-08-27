import { Module } from '@nestjs/common';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerLocationController } from './serer-location.controller';
import { ServerLocationService } from './server-location.service';
import { LocationRepository } from './location.repository';

@Module({
  imports: [KyselyModule],
  controllers: [ServerLocationController],
  providers: [ServerLocationService, LocationRepository],
  exports: [ServerLocationService],
})
export class ServerLocationModule {}
