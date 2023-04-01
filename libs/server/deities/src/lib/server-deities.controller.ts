import { Controller } from '@nestjs/common';
import { ServerDeitiesService } from './server-deities.service';

@Controller('server-deities')
export class ServerDeitiesController {
  constructor(private serverDeitiesService: ServerDeitiesService) {}
}
