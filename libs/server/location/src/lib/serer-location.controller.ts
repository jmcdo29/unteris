import { Controller, Get, Query } from '@nestjs/common';
import { SkipSessionCheck } from '@unteris/server/session';
import { ServerLocationService } from './server-location.service';
import { ByTypeQueryDto } from './models/by-type-query.dto';

@Controller('locations')
@SkipSessionCheck()
export class ServerLocationController {
  constructor(private readonly service: ServerLocationService) {}
  @Get()
  getAllLocations(@Query() query: ByTypeQueryDto) {
    return this.service.getLocationsByType(query.data.type);
  }
}
