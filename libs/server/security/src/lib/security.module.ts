import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { ServerCsrfModule } from '@unteris/server/csrf';
import { ServerEmailModule } from '@unteris/server/email';
import { ServerHashModule } from '@unteris/server/hash';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerSessionModule } from '@unteris/server/session';
import { ServerTokenModule } from '@unteris/server/token';
import { ServerSecurityController } from './security.controller';
import { SecurityRepo } from './security.repository';
import { ServerSecurityService } from './security.service';

@Module({
  imports: [
    KyselyModule,
    ServerSessionModule,
    ServerHashModule,
    ServerCsrfModule,
    ServerEmailModule,
    ServerTokenModule,
    OgmaModule.forFeature(ServerSecurityService),
  ],
  controllers: [ServerSecurityController],
  providers: [ServerSecurityService, SecurityRepo],
  exports: [ServerSecurityService],
})
export class ServerSecurityModule {}
