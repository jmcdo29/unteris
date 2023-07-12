import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NestCookieRequest } from 'nest-cookies';
import { RefreshSessionGuard } from './refresh-session.guard';
import { SkipSessionCheck } from './session.decorator';
import { SessionData } from './session.interface';
import { ServerSessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: ServerSessionService) {}
  @Get('refresh')
  @UseGuards(RefreshSessionGuard)
  @SkipSessionCheck()
  async refreshSession(
    @Req()
    {
      cookies,
      _cookies,
      oldSession,
    }: NestCookieRequest<{ oldSession: SessionData }>
  ) {
    const { refreshId } = cookies;
    const sessionId = await this.sessionService.createSessionId();
    await this.sessionService.createSession(oldSession, sessionId);
    await this.sessionService.updateSession(refreshId, { sessionId });
    _cookies.push(
      this.sessionService.createCookie({
        name: 'session',
        value: sessionId,
      })
    );
    return { success: true };
  }
}
