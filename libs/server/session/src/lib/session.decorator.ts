import { SetMetadata } from "@nestjs/common";

export const SKIP_LOGGED_IN_CHECK = Symbol("metadata:skip logged in check");

export const SkipLoggedInCheck = (skip = true) =>
	SetMetadata(SKIP_LOGGED_IN_CHECK, skip);
