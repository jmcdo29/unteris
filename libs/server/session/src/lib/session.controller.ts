import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RefreshRequest } from '@unteris/server/common';
import { Cookie, Cookies, NewCookies } from 'nest-cookies';
import { RefreshSessionGuard } from './refresh-session.guard';
import { SkipSessionCheck } from './session.decorator';
import { ServerSessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: ServerSessionService) {}
  @Get('refresh')
  @UseGuards(RefreshSessionGuard)
  @SkipSessionCheck()
  async refreshSession(
    @Cookies() cookies: Record<string, string>,
    @NewCookies() newCookies: Cookie[],
    @Req()
    { oldSession }: RefreshRequest
  ) {
    const { refreshId } = cookies;
    const sessionId = await this.sessionService.createSessionId();
    await this.sessionService.createSession(oldSession, sessionId);
    await this.sessionService.updateSession(refreshId, { sessionId });
    newCookies.push(
      this.sessionService.createCookie({
        name: 'session',
        value: sessionId,
      })
    );
    return { success: true };
  }
}
