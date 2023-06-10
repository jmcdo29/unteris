import { Controller } from '@nestjs/common';
import { ServerRaceService } from './race.service';

@Controller('race')
export class ServerRaceController {
  constructor(private serverRaceService: ServerRaceService) {}
}
