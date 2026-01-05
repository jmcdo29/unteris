import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import type {
	AuthorizedUser,
	ReqMetaType,
	RoleEnum,
} from "@unteris/server/common";
import { ServerCryptService } from "@unteris/server/crypt";
import { ServerEmailService } from "@unteris/server/email";
import { ServerHashService } from "@unteris/server/hash";
import { ServerSessionService } from "@unteris/server/session";
import { ServerTokenService } from "@unteris/server/token";
import {
	authRoute,
	type LoginBody,
	type LoginResponse,
	type PasswordReset,
	type PasswordResetRequest,
	type SignupUser,
	type Success,
} from "@unteris/shared/types";
import { Cookie } from "nest-cookies";
import { SignUpLocalResponse } from "./models/signup-local-response.dto";
import { SecurityRepo } from "./security.repository";

@Injectable()
export class ServerSecurityService {
	constructor(
		private readonly sessionService: ServerSessionService,
		private readonly hashService: ServerHashService,
		private readonly emailService: ServerEmailService,
		private readonly tokenService: ServerTokenService,
		@OgmaLogger(ServerSecurityService) private readonly logger: OgmaService,
		private readonly securityRepo: SecurityRepo,
		private readonly crypt: ServerCryptService,
	) {}

	async signUpLocal(
		newUser: SignupUser,
		newCookies: Cookie[],
		meta: ReqMetaType,
	): Promise<SignUpLocalResponse> {
		const existingAccount = await this.securityRepo.findUserByEmail(
			newUser.email,
		);
		if (existingAccount) {
			throw new BadRequestException({
				type: "Authentication",
				message: [
					`Email ${newUser.email} is already taken. Did you mean to login?`,
				],
			});
		}
		const createdUser = await this.securityRepo.createUserRecord(newUser);
		const loginMethod = await this.securityRepo.createLoginMethodRecord(
			createdUser.id,
			"local",
		);
		await this.securityRepo.createLocalLoginRecord(
			await this.hashService.hash(newUser.password),
			loginMethod.id,
		);
		const sessionData = await this.sessionService.createFullSession({
			userId: createdUser.id,
			operatingSystem: meta.operatingSystem,
			browserType: meta.userAgent,
			ipAddress: meta.ip,
		});
		const refreshCookie = this.sessionService.createCookie({
			name: "refresh",
			value: sessionData.refreshId,
			options: { path: `/api/${authRoute}/refresh` },
		});
		newCookies.push(refreshCookie);
		await this.sendEmailVerification({
			id: createdUser.id,
			name: newUser.name,
			email: newUser.email,
		});
		return {
			success: true,
			id: createdUser.id,
			sessionId: this.crypt.encrypt(sessionData.id),
		};
	}

	private async sendEmailVerification(user: {
		id: string;
		name: string;
		email: string;
	}): Promise<void> {
		try {
			const verificationToken = await this.tokenService.generateToken(192);
			await this.securityRepo.createUserVerificationRecord(
				user.id,
				verificationToken,
			);
			await this.emailService.sendVerificationEmail(
				user.name,
				user.email,
				verificationToken,
			);
		} catch (err) {
			if (err instanceof Error) {
				this.logger.printError(err);
			} else {
				this.logger.error(err);
			}
		}
	}

	async logUserIn(
		userLogin: LoginBody,
		newCookies: Cookie[],
		meta: ReqMetaType,
	): Promise<LoginResponse> {
		const users = await this.securityRepo.findUserWithLocalLogin(
			userLogin.email,
		);
		const userId = users[0]?.id;
		if (!users.length || !users.every((u) => u.id === userId)) {
			throw new UnauthorizedException();
		}
		const [firstUser, ...userRecords] = users;
		const user = { ...firstUser, roles: [firstUser?.roles] as RoleEnum[] };
		if (user.attempts >= 5) {
			throw new UnauthorizedException({
				type: "AttemptLimit",
				message: ["Too many login attempts. Try again later."],
			});
		}
		if (
			!user ||
			!(await this.hashService.verify(userLogin.password, user.password))
		) {
			await this.securityRepo.incrementLoginAttemptsByLocalLoginId(
				user.localLoginId,
			);
			throw new UnauthorizedException({
				type: "Authentication",
				message: ["Invalid username or password"],
			});
		}
		for (const u of userRecords) {
			user.roles.push(u.roles as RoleEnum);
		}
		const sessionData = await this.sessionService.createFullSession({
			userId: user.id,
			operatingSystem: meta.operatingSystem,
			browserType: meta.userAgent,
			ipAddress: meta.ip,
		});
		const refreshCookie = this.sessionService.createCookie({
			name: "refresh",
			value: sessionData.refreshId,
			options: { path: `/api/${authRoute}/refresh` },
		});
		newCookies.push(refreshCookie);
		await this.securityRepo.clearLoginAttemptsByLocalLoginId(user.localLoginId);
		return {
			success: true,
			displayName: user.name,
			id: user.id,
			roles: user.roles,
			sessionId: this.crypt.encrypt(sessionData.id),
		};
	}

	async logout(sessionId: string): Promise<void> {
		await this.sessionService.destroySession(sessionId);
	}

	async verifyUserRecord(verificationToken: string): Promise<Success> {
		await this.securityRepo.setUserRecordAsActive(verificationToken);
		return { success: true };
	}

	async createPasswordResetToken({
		email,
	}: PasswordResetRequest): Promise<void> {
		const user = await this.securityRepo.findUserByEmail(email);
		if (!user) {
			throw new BadRequestException({
				type: "Unknown Email",
				message: [
					`No user with email ${email} was found. Perhaps you'd like to sign up?`,
				],
			});
		}
		const resetToken = await this.tokenService.generateToken(256);
		await this.securityRepo.createUserPasswordResetRecord(user.id, resetToken);
		await this.emailService.sendPasswordResetEmail(email, resetToken);
	}

	async resetUserPassword({
		resetToken,
		password,
	}: PasswordReset): Promise<void> {
		const user = await this.securityRepo.findUserByResetToken(resetToken);
		await this.securityRepo.updateUserPassword(
			user.id,
			await this.hashService.hash(password),
		);
	}

	async getUserById(id: string): Promise<AuthorizedUser> {
		const users = await this.securityRepo.findUserById(id);
		const user = { ...users[0], roles: [users[0].roles] };
		for (const u of users) {
			if (!user.roles.includes(u.roles)) {
				user.roles.push(u.roles);
			}
		}
		return user;
	}

	async refreshSession(
		oldRefreshId: string,
		meta: ReqMetaType,
		newCookies: Cookie[],
	) {
		const { refreshId, sessionId } = await this.sessionService.refreshSession(
			oldRefreshId,
			meta,
		);
		const refreshCookie = this.sessionService.createCookie({
			name: "refresh",
			value: this.crypt.encrypt(refreshId),
			options: {
				path: `/api/${authRoute}/refresh`,
			},
		});
		newCookies.push(refreshCookie);
		return { sessionId: this.crypt.encrypt(sessionId) };
	}
}
