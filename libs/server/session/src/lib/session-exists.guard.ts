import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestCookieRequest } from 'nest-cookies';
import { SKIP_SESSION_LOGGED_IN_CHECK } from './session.decorator';
import { SessionData } from './session.interface';
import { ServerSessionService } from './session.service';

/**
 * This is  less of a guard and more of a middleware as it will always return
 * true, but it's useful to ensure that the sesssion does indeed exist and the
 * proper values are available via the cookies/session
 **/
@Injectable()
export class SessionExistsGuard implements CanActivate {
  constructor(
    private readonly sessionService: ServerSessionService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    if (
      this.reflector.getAllAndOverride(SKIP_SESSION_LOGGED_IN_CHECK, [
        context.getClass(),
        context.getHandler(),
      ])
    ) {
      return true;
    }
    const req = context
      .switchToHttp()
      .getRequest<
        NestCookieRequest<{ session?: SessionData & { id: string } }>
      >();
    const { sessionId } = req.cookies;
    const session = await this.sessionService.getSession(sessionId ?? '');
    if (!this.sessionService.isSession(session)) {
      const newSession: SessionData = { user: {}, csrf: '' };
      const { id, refreshId } = await this.sessionService.createFullSession(
        newSession
      );
      req._cookies.push(
        this.sessionService.createCookie({
          name: 'session',
          value: id,
        })
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
