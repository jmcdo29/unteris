import { Controller, Get, Param } from '@nestjs/common';
import { IdParamDto } from './models/id-param.dto';
import { ServerRaceService } from './race.service';

@Controller('race')
export class ServerRaceController {
  constructor(private serverRaceService: ServerRaceService) {}

  @Get()
  async getAllRaces() {
    return this.serverRaceService.getRaces();
  }

  @Get(':id')
  async getRaceWithAbilities(@Param() param: IdParamDto) {
    return this.serverRaceService.getRaceWithAbilities(param.data.id);
  }
}
