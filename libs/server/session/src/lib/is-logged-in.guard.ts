import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionData } from '@unteris/server/common';
import { SKIP_SESSION_LOGGED_IN_CHECK } from './session.decorator';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const skipCheck = this.reflector.getAllAndOverride(
      SKIP_SESSION_LOGGED_IN_CHECK,
      [context.getClass(), context.getHandler()]
    );
    if (skipCheck) {
      return true;
    }
    const req = context.switchToHttp().getRequest<{ session: SessionData }>();
    const { session } = req;
    if (!this.userIsLoggedIn(session)) {
      return false;
    }
    // const userId = session.user['id'];
    // check that user is in db
    // hydrate user
    return true;
  }

  private userIsLoggedIn(session: SessionData) {
    return Object.keys(session.user).length > 0;
  }
}
