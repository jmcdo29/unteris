import { Controller } from '@nestjs/common';
import { ServerCsrfService } from './csrf.service';

@Controller('csrf')
export class ServerCsrfController {
  constructor(private serverCsrfService: ServerCsrfService) {}
}
