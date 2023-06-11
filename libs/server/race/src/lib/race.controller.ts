import { Controller, Get, Param } from '@nestjs/common';
import { ServerRaceService } from './race.service';

@Controller('race')
export class ServerRaceController {
  constructor(private serverRaceService: ServerRaceService) {}

  @Get()
  async getAllRaces() {
    return this.serverRaceService.getRaces();
  }

  @Get(':id')
  async getRaceWithAbilities(@Param() { id }: { id: string }) {
    return this.serverRaceService.getRaceWithAbilities(id);
  }
}
