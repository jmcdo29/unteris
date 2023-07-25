import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SavedSessionData } from '@unteris/server/session';
import { CsrfGuard } from '@unteris/server/csrf';
import { LoginBodyDto, SignupBody } from './models';
import { ServerSecurityService } from './security.service';
import { Cookies } from 'nest-cookies';
import { TokenVerificationData } from './models/token-verification-query.dto';
import { PasswordResetDto } from './models/password-reset.dto';

@UseGuards(CsrfGuard)
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

  @Post('logout')
  async loguot(@Cookies() cookies: Record<string, string>) {
    const { sessionId } = cookies;
    await this.serverSecurityService.logout(sessionId);
    return { success: true };
  }

  @Get('verify-email')
  async verifyEmailByToken(
    @Query() query: TokenVerificationData
  ): Promise<{ success: boolean }> {
    return this.serverSecurityService.verifyUserRecord(
      query.data.verificationToken
    );
  }

  @Post('password-reset')
  async startUserPasswordReset(
    @Body() body: PasswordResetDto
  ): Promise<{ success: boolean }> {
    await this.serverSecurityService.createPasswordResetToken(body.data);
    return { success: true };
  }
}
