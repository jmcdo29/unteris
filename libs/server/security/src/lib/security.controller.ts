import { Controller, Post } from '@nestjs/common';
import { ServerSecurityService } from './security.service';

@Controller('auth')
export class ServerSecurityController {
  constructor(private serverSecurityService: ServerSecurityService) {}

  @Post('signup')
  async signup() {
    return {};
  }

  @Post('login')
  async login() {
    return {};
  }
}
