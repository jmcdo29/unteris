import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { AuthorizedRequest } from "@unteris/server/common";
import { SKIP_SESSION_LOGGED_IN_CHECK } from "@unteris/server/session";
import { ServerSecurityService } from "./security.service";

@Injectable()
export class IsLoggedInGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly securityService: ServerSecurityService,
	) {}

	async canActivate(context: ExecutionContext) {
		const skipCheck = this.reflector.getAllAndOverride(
			SKIP_SESSION_LOGGED_IN_CHECK,
			[context.getHandler(), context.getClass()],
		);
		if (skipCheck) {
			return true;
		}
		const req = context.switchToHttp().getRequest<AuthorizedRequest>();
		const { session } = req;
		if (!session.user.id) {
			return false;
		}
		const user = await this.securityService.getUserById(session.user.id);
		req.user = user;
		return true;
	}
}
