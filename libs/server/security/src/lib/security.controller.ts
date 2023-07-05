import { Body, Controller, Post, Session } from '@nestjs/common';
import { SavedSessionData } from '@unteris/server/session';
import { LoginBodyDto, SignupBody } from './models';
import { ServerSecurityService } from './security.service';

@Controller('auth')
export class ServerSecurityController {
  constructor(private serverSecurityService: ServerSecurityService) {}

  @Post('signup')
  async signup(
    @Body() body: SignupBody,
    @Session() session: { id: string & SavedSessionData }
  ) {
    return this.serverSecurityService.signUpLocal(body.data, session.id);
  }

  @Post('login')
  async login(
    @Body() body: LoginBodyDto,
    @Session() session: { id: string & SavedSessionData }
  ) {
    return this.serverSecurityService.logUserIn(body.data, session.id);
  }
}
