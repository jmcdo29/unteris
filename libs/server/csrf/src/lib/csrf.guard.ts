import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { csrfHeader } from '@unteris/shared/types';
import { ServerCsrfService } from './csrf.service';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private readonly csrfService: ServerCsrfService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers, session, method } = context.switchToHttp().getRequest<{
      headers: { [csrfHeader]: string };
      session: { id: string };
      [key: string]: any;
    }>();
    if (method === 'GET') {
      return true;
    }
    return this.csrfService.verifyCsrfToken({
      sessionId: session.id,
      csrfToken: headers[csrfHeader],
    });
  }
}
