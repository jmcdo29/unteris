import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CacheSkip } from "@unteris/server/cache";
import { AuthorizedRequest, ReqMeta, ReqMetaDto } from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { authRoute, type Success } from "@unteris/shared/types";
import { type Cookie, Cookies, NewCookies } from "nest-cookies";
import { LoginBodyDto, SignupBodyDto } from "./models";
import { PasswordResetDto } from "./models/password-reset.dto";
import { PasswordResetRequestDto } from "./models/password-reset-request.dto";
import { SignUpLocalResponseDtp } from "./models/signup-local-response.dto";
import { TokenVerificationData } from "./models/token-verification-query.dto";
import { ServerSecurityService } from "./security.service";

@ApiTags("Security")
@Controller(authRoute)
@SkipLoggedInCheck()
export class ServerSecurityController {
	constructor(private serverSecurityService: ServerSecurityService) {}

	// @ApiConsumes("multipart/form-data")
	@ApiCreatedResponse({ type: SignUpLocalResponseDtp })
	@Post("signup")
	async signup(
		@Body() body: SignupBodyDto,
		@NewCookies() newCookies: Cookie[],
		@ReqMeta() meta: ReqMetaDto,
	) {
		return this.serverSecurityService.signUpLocal(
			body.data,
			newCookies,
			meta.data,
		);
	}

	@Post("login")
	async login(
		@Body() body: LoginBodyDto,
		@NewCookies() newCookies: Cookie[],
		@ReqMeta() meta: ReqMetaDto,
	) {
		return this.serverSecurityService.logUserIn(
			body.data,
			newCookies,
			meta.data,
		);
	}

	@Post("logout")
	@SkipLoggedInCheck(false)
	async logout(@Req() req: AuthorizedRequest) {
		const { sessionId } = req;
		await this.serverSecurityService.logout(sessionId);
		return { success: true };
	}

	@Get("verify-email")
	@SkipLoggedInCheck(false)
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
	@SkipLoggedInCheck(false)
	async getMe(@Req() { user }: { user: Record<string, unknown> }) {
		return user;
	}

	@Get("refresh")
	@CacheSkip()
	async refreshSession(
		@Cookies() { refreshId }: Record<string, string>,
		@ReqMeta() meta: ReqMetaDto,
		@NewCookies() newCookies: Cookie[],
	) {
		return await this.serverSecurityService.refreshSession(
			refreshId,
			meta.data,
			newCookies,
		);
	}
}
