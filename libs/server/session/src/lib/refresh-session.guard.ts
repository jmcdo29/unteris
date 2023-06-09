import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { NestCookieRequest } from 'nest-cookies';
import { ServerSessionService } from './session.service';

@Injectable()
export class RefreshSessionGuard implements CanActivate {
  constructor(private readonly sessionService: ServerSessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<NestCookieRequest<object>>();
    const { cookies } = req;
    const { sessionId, refreshId } = cookies;
    const refreshSessionData = await this.sessionService.getSession(refreshId);
    if (!this.sessionService.isRefreshData(refreshSessionData)) {
      return false;
    }
    if (sessionId !== refreshSessionData.sessionId) {
      return false;
    }
    return true;
  }
}
