import { Inject } from "@nestjs/common";

export const REDIS_OPTIONS = Symbol("REDIS:OPTIONS");
export const REDIS_INSTANCE = Symbol("REDIS:INSTNACE");

export const getOptionsToken = () => REDIS_OPTIONS;
export const getInstanceToken = () => REDIS_INSTANCE;

export const InjectRedisOptions = () => Inject(getOptionsToken());
export const InjectRedisInstance = () => Inject(getInstanceToken());
