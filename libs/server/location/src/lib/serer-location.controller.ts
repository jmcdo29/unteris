import { Controller, Get } from '@nestjs/common';
import { SkipSessionCheck } from '@unteris/server/session';
import { ServerLocationService } from './server-location.service';

@Controller('locations')
@SkipSessionCheck()
export class ServerLocationController {
  constructor(private readonly service: ServerLocationService) {}
  @Get()
  getAllLocations() {
    return this.service.getLocations();
  }
}
