import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { NestCookieRequest } from 'nest-cookies';
import { SavedSessionData } from './session.interface';
import { ServerSessionService } from './session.service';

@Injectable()
export class RefreshSessionGuard implements CanActivate {
  constructor(private readonly sessionService: ServerSessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<NestCookieRequest<{ oldSession: SavedSessionData }>>();
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
