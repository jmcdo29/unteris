import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from "@nestjs/common";
import type { Reflector } from "@nestjs/core";
import type { AuthorizedRequest } from "@unteris/server/common";
import { Castle } from "./castle.decorator";
import type { ServerCastleService } from "./castle.service";

@Injectable()
export class CastleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly service: ServerCastleService,
	) {}

	canActivate(context: ExecutionContext) {
		const [action, expectedSubject] = this.reflector.getAllAndOverride(Castle, [
			context.getHandler(),
			context.getClass(),
		]);
		const req = context.switchToHttp().getRequest<AuthorizedRequest>();
		const { user } = req;

		return this.service.buildAbilityForUser(user).can(action, expectedSubject);
	}
}
