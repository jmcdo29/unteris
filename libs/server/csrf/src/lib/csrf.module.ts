import { Module } from '@nestjs/common';
import { ServerCsrfController } from './csrf.controller';
import { ServerCsrfService } from './csrf.service';

@Module({
  controllers: [ServerCsrfController],
  providers: [ServerCsrfService],
  exports: [ServerCsrfService],
})
export class ServerCsrfModule {}
