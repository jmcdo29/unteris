import { Reflector } from "@nestjs/core";

export const CacheSkip = Reflector.createDecorator<boolean>({
	transform: (val?: boolean) => val ?? true,
});
