import { SetMetadata } from "@nestjs/common";

export const SKIP_SESSION_LOGGED_IN_CHECK = Symbol(
	"metadata:skip session logged in check",
);

export const SkipSessionCheck = (skip = true) =>
	SetMetadata(SKIP_SESSION_LOGGED_IN_CHECK, skip);
