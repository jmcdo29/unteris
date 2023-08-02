import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RefreshRequest } from '@unteris/server/common';
import { NestCookieRequest } from 'nest-cookies';
import { ServerSessionService } from './session.service';

@Injectable()
export class RefreshSessionGuard implements CanActivate {
  constructor(private readonly sessionService: ServerSessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<NestCookieRequest<RefreshRequest>>();
    const { cookies } = req;
    const { refreshId } = cookies;
    const refreshSessionData = await this.sessionService.getSession(refreshId);
    if (!this.sessionService.isRefreshData(refreshSessionData)) {
      return false;
    }
    const oldSession = await this.sessionService.getSession(
      refreshSessionData.sessionId
    );
    req.oldSession = oldSession;
    return true;
  }
}
