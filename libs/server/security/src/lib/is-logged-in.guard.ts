import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from "@nestjs/common";
<<<<<<< HEAD
import { Reflector } from "@nestjs/core";
import { AuthorizedRequest } from "@unteris/server/common";
import { ServerCryptService } from "@unteris/server/crypt";
import {
	ServerSessionService,
	SKIP_LOGGED_IN_CHECK,
} from "@unteris/server/session";
import { ServerSecurityService } from "./security.service";
=======
import type { Reflector } from "@nestjs/core";
import type { AuthorizedRequest } from "@unteris/server/common";
import { SKIP_SESSION_LOGGED_IN_CHECK } from "@unteris/server/session";
import type { ServerSecurityService } from "./security.service";
>>>>>>> 6631869 (chore: update code for biome rules)

@Injectable()
export class IsLoggedInGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly securityService: ServerSecurityService,
		private readonly sessionService: ServerSessionService,
		private readonly crypt: ServerCryptService,
	) {}

	async canActivate(context: ExecutionContext) {
		const skipCheck = this.reflector.getAllAndOverride(SKIP_LOGGED_IN_CHECK, [
			context.getHandler(),
			context.getClass(),
		]);
		if (skipCheck) {
			return true;
		}
		const req = context
			.switchToHttp()
			.getRequest<AuthorizedRequest & { headers: Record<string, string> }>();
		const { authorization } = req.headers;
		if (!authorization) {
			return false;
		}
		const [schema, sessionIdEncrypted] = authorization.split(" ");
		if (schema.toLowerCase() !== "bearer") {
			return false;
		}
		const sessionId = this.crypt.decrypt(sessionIdEncrypted);
		const session = await this.sessionService.getSession(sessionId);
		if (!session.user.id) {
			return false;
		}
		req.sessionId = sessionId;
		const user = await this.securityService.getUserById(session.user.id);
		req.user = user;
		return true;
	}
}
