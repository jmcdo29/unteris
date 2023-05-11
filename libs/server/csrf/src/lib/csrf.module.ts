import { Module } from '@nestjs/common';
import { ServerTokenModule } from '@unteris/server/token';
import { ServerCsrfController } from './csrf.controller';
import { ServerCsrfService } from './csrf.service';

@Module({
  imports: [ServerTokenModule],
  controllers: [ServerCsrfController],
  providers: [ServerCsrfService],
  exports: [ServerCsrfService],
})
export class ServerCsrfModule {}
