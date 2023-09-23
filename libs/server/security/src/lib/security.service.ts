import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { ServerEmailService } from "@unteris/server/email";
import { ServerHashService } from "@unteris/server/hash";
import { ServerSessionService } from "@unteris/server/session";
import { ServerTokenService } from "@unteris/server/token";
import {
	LoginBody,
	LoginResponse,
	PasswordReset,
	PasswordResetRequest,
	SignupUser,
	UserAccount,
} from "@unteris/shared/types";
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
	) {}

	async signUpLocal(
		newUser: SignupUser,
		sessionId: string,
	): Promise<{ success: boolean; id: UserAccount["id"] }> {
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
		this.sessionService.updateSession(sessionId, {
			user: { email: newUser.email, id: createdUser.id },
		});
		void this.sendEmailVerification({
			id: createdUser.id,
			name: newUser.name,
			email: newUser.email,
		});
		return { success: true, id: createdUser.id };
	}

	private async sendEmailVerification(
		user: Pick<UserAccount, "id" | "email" | "name">,
	): Promise<void> {
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
		sessionId: string,
	): Promise<LoginResponse> {
		const user = await this.securityRepo.findUserWithLocalLogin(
			userLogin.email,
		);
		if (!user || user.attempts >= 5) {
			throw new UnauthorizedException({
				type: "AttemptLimit",
				message: ["Too many login attempts. Try again later."],
			});
		}
		if (
			!user ||
			!(await this.hashService.verify(userLogin.password, user.password))
		) {
			void this.securityRepo.incrementLoginAttemptsByLocalLoginId(
				user.localLoginId,
			);
			throw new UnauthorizedException({
				type: "Authentication",
				message: ["Invalid username or password"],
			});
		}
		await this.sessionService.updateSession(sessionId, {
			user: { email: user.email, id: user.id },
		});
		void this.securityRepo.clearLoginAttemptsByLocalLoginId(user.localLoginId);
		return { success: true, displayName: user.name, id: user.id };
	}

	async logout(sessionId: string): Promise<void> {
		await this.sessionService.updateSession(sessionId, { user: {} });
	}

	async verifyUserRecord(
		verificationToken: string,
	): Promise<{ success: boolean }> {
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

	async getUserById(id: string): Promise<UserAccount> {
		return await this.securityRepo.findUserById(id);
	}
}
