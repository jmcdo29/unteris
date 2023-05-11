import { Controller, Get } from '@nestjs/common';
import { ServerCsrfService } from './csrf.service';

@Controller('csrf')
export class ServerCsrfController {
  constructor(private serverCsrfService: ServerCsrfService) {}
  @Get()
  async getCsrfToken(): Promise<string> {
    return this.serverCsrfService.generateToken();
  }
}
