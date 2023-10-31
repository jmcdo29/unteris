import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthorizedRequest } from "@unteris/server/common";
import { Castle } from "./castle.decorator";
import { ServerCastleService } from "./castle.service";

@Injectable()
export class CastleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly service: ServerCastleService,
	) {}

	canActivate(context: ExecutionContext) {
		const [action, expectedSubject] = this.reflector.getAllAndOverride(Castle, [
			context.getClass(),
			context.getHandler(),
		]);
		const req = context.switchToHttp().getRequest<AuthorizedRequest>();
		const { user } = req;

		return this.service.buildAbilityForUser(user).can(action, expectedSubject);
	}
}
