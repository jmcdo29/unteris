import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { NestCookieRequest } from 'nest-cookies';
import { SessionData } from './session.interface';
import { ServerSessionService } from './session.service';

/**
 * This is  less of a guard and more of a middleware as it will always return
 * true, but it's useful to ensure that the sesssion does indeed exist and the
 * proper values are available via the cookies/session
 **/
@Injectable()
export class SessionExistsGuard implements CanActivate {
  constructor(private readonly sessionService: ServerSessionService) {}

  async canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest<
        NestCookieRequest<{ session?: SessionData & { id: string } }>
      >();
    const { sessionId } = req.cookies;
    const session = await this.sessionService.getSession(sessionId);
    if (!this.sessionService.isSession(session)) {
      const newSession: SessionData = { user: {}, csrf: '' };
      const { id, refreshId } = await this.sessionService.createSession(
        newSession
      );
      req._cookies.push(
        this.sessionService.createCookie({ name: 'session', value: id })
      );
      req._cookies.push(
        this.sessionService.createCookie({ name: 'refresh', value: refreshId })
      );
      req.session = { ...newSession, id };
    } else {
      req.session = { ...session, id: sessionId };
    }
    return true;
  }
}
