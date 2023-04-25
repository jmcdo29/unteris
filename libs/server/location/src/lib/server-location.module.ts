import { Module } from '@nestjs/common';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerLocationController } from './serer-location.controller';
import { ServerLocationService } from './server-location.service';

@Module({
  imports: [KyselyModule],
  controllers: [ServerLocationController],
  providers: [ServerLocationService],
  exports: [ServerLocationService],
})
export class ServerLocationModule {}
