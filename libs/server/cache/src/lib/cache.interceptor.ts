import { CacheInterceptor as NestCacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { CacheSkip } from "./cache-skip.decorator";

@Injectable()
export class CacheInterceptor extends NestCacheInterceptor {
	protected override isRequestCacheable(context: ExecutionContext): boolean {
		const skip = this.reflector.getAllAndOverride<boolean | undefined>(
			CacheSkip,
			[context.getClass(), context.getHandler()],
		);
		return skip !== undefined ? !skip : super.isRequestCacheable(context);
	}
}
