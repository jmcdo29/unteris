import { Controller, Get } from '@nestjs/common';
import { ServerLocationService } from './server-location.service';

@Controller('locations')
export class ServerLocationController {
  constructor(private readonly service: ServerLocationService) {}
  @Get()
  getAllLocations() {
    return this.service.getLocations();
  }
}
