import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { CacheSkip } from "@unteris/server/cache";
import {
	AuthorizedRequest,
	authRoute,
	ReqMeta,
	ReqMetaDto,
} from "@unteris/server/common";
import { SkipLoggedInCheck } from "@unteris/server/session";
import { type Cookie, Cookies, NewCookies } from "nest-cookies";
import {
	GetMeResponse,
	GetMeResponseDto,
	GetRefreshResponse,
	GetRefreshResponseDto,
	GetVerifyEmailResponse,
	GetVerifyEmailResponseDto,
	LoginBodyDto,
	LoginResponseDto,
	LogoutResponse,
	LogoutResponseDto,
	PasswordResetDto,
	PasswordResetRequestDto,
	PasswordResetRequestResponse,
	PasswordResetRequestResponseDto,
	PasswordResetResponse,
	PasswordResetResponseDto,
	SignUpLocalResponseDto,
	SignupBodyDto,
	TokenVerificationData,
} from "./models";
import { ServerSecurityService } from "./security.service";

@ApiTags("Security")
@Controller(authRoute)
@SkipLoggedInCheck()
export class ServerSecurityController {
	constructor(private serverSecurityService: ServerSecurityService) {}

	// @ApiConsumes("multipart/form-data")
	@ApiCreatedResponse({ type: SignUpLocalResponseDto })
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

	@ApiOkResponse({ type: LoginResponseDto })
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

	@ApiCreatedResponse({ type: LogoutResponseDto })
	@ApiBearerAuth()
	@Post("logout")
	@SkipLoggedInCheck(false)
	async logout(@Req() req: AuthorizedRequest): Promise<LogoutResponse> {
		const { sessionId } = req;
		await this.serverSecurityService.logout(sessionId);
		return { success: true };
	}

	@ApiOkResponse({ type: GetVerifyEmailResponseDto })
	@Get("verify-email")
	@SkipLoggedInCheck(false)
	async verifyEmailByToken(
		@Query() query: TokenVerificationData,
	): Promise<GetVerifyEmailResponse> {
		return this.serverSecurityService.verifyUserRecord(
			query.data.verificationToken,
		);
	}

	@ApiCreatedResponse({ type: PasswordResetRequestResponseDto })
	@Post("password-reset-request")
	async startUserPasswordReset(
		@Body() body: PasswordResetRequestDto,
	): Promise<PasswordResetRequestResponse> {
		await this.serverSecurityService.createPasswordResetToken(body.data);
		return { success: true };
	}

	@ApiCreatedResponse({ type: PasswordResetResponseDto })
	@Post("password-reset")
	async resetUserPasswordFromToken(
		@Body() body: PasswordResetDto,
	): Promise<PasswordResetResponse> {
		await this.serverSecurityService.resetUserPassword(body.data);
		return { success: true };
	}

	@ApiOkResponse({ type: GetMeResponseDto })
	@ApiBearerAuth()
	@Get("me")
	@CacheSkip()
	@SkipLoggedInCheck(false)
	async getMe(@Req() { user }: AuthorizedRequest): Promise<GetMeResponse> {
		return user;
	}

	@ApiOkResponse({ type: GetRefreshResponseDto })
	@ApiBearerAuth()
	@Get("refresh")
	@CacheSkip()
	async refreshSession(
		@Cookies() { refreshId }: Record<string, string>,
		@ReqMeta() meta: ReqMetaDto,
		@NewCookies() newCookies: Cookie[],
	): Promise<GetRefreshResponse> {
		return await this.serverSecurityService.refreshSession(
			refreshId,
			meta.data,
			newCookies,
		);
	}
}
