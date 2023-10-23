import { SetMetadata } from "@nestjs/common";
import { CACHE_SKIP } from "./cache.constants";

export const CacheSkip = (skip = true) => SetMetadata(CACHE_SKIP, skip);
