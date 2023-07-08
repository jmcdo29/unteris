import { Module } from '@nestjs/common';
import { ServerCsrfModule } from '@unteris/server/csrf';
import { ServerHashModule } from '@unteris/server/hash';
import { KyselyModule } from '@unteris/server/kysely';
import { ServerSessionModule } from '@unteris/server/session';
import { ServerSecurityController } from './security.controller';
import { ServerSecurityService } from './security.service';

@Module({
  imports: [
    KyselyModule,
    ServerSessionModule,
    ServerHashModule,
    ServerCsrfModule,
  ],
  controllers: [ServerSecurityController],
  providers: [ServerSecurityService],
  exports: [ServerSecurityService],
})
export class ServerSecurityModule {}
