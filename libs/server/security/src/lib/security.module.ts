import { Module } from '@nestjs/common';
import { ServerSecurityController } from './security.controller';
import { ServerSecurityService } from './security.service';

@Module({
  controllers: [ServerSecurityController],
  providers: [ServerSecurityService],
  exports: [ServerSecurityService],
})
export class ServerSecurityModule {}
