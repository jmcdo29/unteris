import { IncomingMessage } from "node:http";
import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ServerCryptService } from "@unteris/server/crypt";
import {
	ServerSessionService,
	SKIP_LOGGED_IN_CHECK,
} from "@unteris/server/session";
import { ServerSecurityService } from "./security.service";

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
			.getRequest<IncomingMessage & { user?: Record<string, unknown> }>();
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
		const user = await this.securityService.getUserById(session.user.id);
		req.user = user;
		return true;
	}
}
