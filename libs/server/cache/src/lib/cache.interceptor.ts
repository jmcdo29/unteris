import { CacheInterceptor as NestCacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { CACHE_SKIP } from "./cache.constants";

@Injectable()
export class CacheInterceptor extends NestCacheInterceptor {
	protected override trackBy(context: ExecutionContext): string | undefined {
		const originalKey = super.trackBy(context);
		if (originalKey?.includes("csrf")) {
			const req = context.switchToHttp().getRequest();
			return `${req.ips?.length ? req.ips[0] : req.ip}:${originalKey}`;
		}
		return originalKey;
	}

	protected override isRequestCacheable(context: ExecutionContext): boolean {
		const skip = this.reflector.getAllAndOverride<boolean | undefined>(
			CACHE_SKIP,
			[context.getClass(), context.getHandler()],
		);
		return skip !== undefined ? !skip : super.isRequestCacheable(context);
	}
}
