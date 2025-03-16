import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	Req,
	Session,
	UseGuards,
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CacheSkip } from "@unteris/server/cache";
import type { UnterisCookies, UnterisSession } from "@unteris/server/common";
import { CsrfGuard } from "@unteris/server/csrf";
import { SkipSessionCheck } from "@unteris/server/session";
import {
	type Success,
	type UserAccount,
	authRoute,
} from "@unteris/shared/types";
import { Cookies } from "nest-cookies";
import type { LoginBodyDto, SignupBodyDto } from "./models";
import type { PasswordResetRequestDto } from "./models/password-reset-request.dto";
import type { PasswordResetDto } from "./models/password-reset.dto";
import type { TokenVerificationData } from "./models/token-verification-query.dto";
import type { ServerSecurityService } from "./security.service";

@ApiTags("Security")
@UseGuards(CsrfGuard)
@Controller(authRoute)
@SkipSessionCheck()
export class ServerSecurityController {
	constructor(private serverSecurityService: ServerSecurityService) {}

	@ApiConsumes("multipart/form-data")
	@Post("signup")
	async signup(
		@Body() body: SignupBodyDto,
		@Session() session: UnterisSession,
	) {
		return this.serverSecurityService.signUpLocal(body.data, session.id);
	}

	@Post("login")
	async login(@Body() body: LoginBodyDto, @Session() session: UnterisSession) {
		return this.serverSecurityService.logUserIn(body.data, session.id);
	}

	@Post("logout")
	async logout(@Cookies() cookies: UnterisCookies) {
		const { sessionId } = cookies;
		await this.serverSecurityService.logout(sessionId);
		return { success: true };
	}

	@Get("verify-email")
	@SkipSessionCheck(false)
	async verifyEmailByToken(
		@Query() query: TokenVerificationData,
	): Promise<Success> {
		return this.serverSecurityService.verifyUserRecord(
			query.data.verificationToken,
		);
	}

	@Post("password-reset-request")
	async startUserPasswordReset(
		@Body() body: PasswordResetRequestDto,
	): Promise<Success> {
		await this.serverSecurityService.createPasswordResetToken(body.data);
		return { success: true };
	}

	@Post("password-reset")
	async resetUserPasswordFromToken(
		@Body() body: PasswordResetDto,
	): Promise<Success> {
		await this.serverSecurityService.resetUserPassword(body.data);
		return { success: true };
	}

	@Get("me")
	@CacheSkip()
	@SkipSessionCheck(false)
	async getMe(@Req() { user }: { user: UserAccount }) {
		return user;
	}
}
