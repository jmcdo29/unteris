import { Controller, Get, Param } from '@nestjs/common';
import { ServerDeitiesService } from './server-deities.service';

@Controller('deities')
export class ServerDeitiesController {
  constructor(private serverDeitiesService: ServerDeitiesService) {}

  @Get('category/:category')
  async getDeitiesByCategory(@Param() { category }: { category: string }) {
    return this.serverDeitiesService.findDeitiesOfCategory(category);
  }

  @Get('id/:id')
  async getDeityById(@Param() { id }: { id: string }) {
    return this.serverDeitiesService.getDeityById(id);
  }

  @Get('location/:location')
  async getDeitiesByLocation(@Param() { location }: { location: string }) {
    return this.serverDeitiesService.findDeitiesOfLocation(location);
  }
}
