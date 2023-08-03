import { Controller, Get, Param } from '@nestjs/common';
import { SkipSessionCheck } from '@unteris/server/session';
import { CategoryParamDto } from './models/category-param.dto';
import { IdParamDto } from './models/id-param.dto';
import { LocationParamDto } from './models/location-param.dto';
import { ServerDeitiesService } from './server-deities.service';

@Controller('deities')
@SkipSessionCheck()
export class ServerDeitiesController {
  constructor(private serverDeitiesService: ServerDeitiesService) {}

  @Get('category/:category')
  async getDeitiesByCategory(@Param() param: CategoryParamDto) {
    return this.serverDeitiesService.findDeitiesOfCategory(param.data.category);
  }

  @Get('id/:id')
  async getDeityById(@Param() param: IdParamDto) {
    return this.serverDeitiesService.getDeityById(param.data.id);
  }

  @Get('location/:location')
  async getDeitiesByLocation(@Param() param: LocationParamDto) {
    return this.serverDeitiesService.findDeitiesOfLocation(param.data.location);
  }
}
