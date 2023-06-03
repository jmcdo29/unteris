import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NestCookieRequest } from 'nest-cookies';
import { RefreshSessionGuard } from './refresh-session.guard';
import { ServerSessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: ServerSessionService) {}
  @Get('refresh')
  @UseGuards(RefreshSessionGuard)
  async refreshSession(
    @Req()
    { cookies, _cookies }: NestCookieRequest<object>
  ) {
    const { refreshId } = cookies;
    const sessionId = await this.sessionService.createSessionId();
    await this.sessionService.updateSession(refreshId, { sessionId });
    _cookies.push(
      this.sessionService.createCookie({ name: 'session', value: sessionId })
    );
    return { success: true };
  }
}
