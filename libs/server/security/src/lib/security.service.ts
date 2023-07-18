import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { ServerEmailService } from '@unteris/server/email';
import { ServerHashService } from '@unteris/server/hash';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { ServerSessionService } from '@unteris/server/session';
import { ServerTokenService } from '@unteris/server/token';
import {
  UserAccount,
  LoginMethod,
  LoginBody,
  SignupUser,
  LoginResponse,
} from '@unteris/shared/types';
import { Kysely } from 'kysely';

@Injectable()
export class ServerSecurityService {
  constructor(
    @InjectKysely() private readonly db: Kysely<Database>,
    private readonly sessionService: ServerSessionService,
    private readonly hashService: ServerHashService,
    private readonly emailService: ServerEmailService,
    private readonly tokenService: ServerTokenService,
    @OgmaLogger(ServerSecurityService) private readonly logger: OgmaService
  ) {}

  async signUpLocal(
    newUser: SignupUser,
    sessionId: string
  ): Promise<{ success: boolean; id: UserAccount['id'] }> {
    const existingAccount = await this.db
      .selectFrom('userAccount')
      .select(['id'])
      .where('email', '=', newUser.email)
      .executeTakeFirst();
    if (existingAccount) {
      throw new BadRequestException({
        type: 'Authentication',
        message: [
          `Email ${newUser.email} is already taken. Did you mean to login?`,
        ],
      });
    }
    const createdUser = await this.db
      .insertInto('userAccount')
      .values({
        email: newUser.email,
        name: newUser.name,
        isVerified: false,
      })
      .returning(['id'])
      .executeTakeFirstOrThrow();
    await this.creatLoginMethod(createdUser.id, 'local');
    await this.createLocalLogin(createdUser.id, newUser.password);
    this.sessionService.updateSession(sessionId, {
      user: { email: newUser.email },
    });
    void this.sendEmailVerification({
      id: createdUser.id,
      name: newUser.name,
      email: newUser.email,
    });
    return { success: true, id: createdUser.id };
  }

  private async sendEmailVerification(
    user: Pick<UserAccount, 'id' | 'email' | 'name'>
  ): Promise<void> {
    try {
      const verificationToken = await this.tokenService.generateToken(192);
      await this.db
        .insertInto('verificationToken')
        .values({
          type: 'verification',
          userId: user.id,
          token: verificationToken,
        })
        .execute();
      await this.emailService.sendVerificationEmail(
        user.name,
        user.email,
        verificationToken
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
    sessionId: string
  ): Promise<LoginResponse> {
    const user = await this.db
      .selectFrom('userAccount as ua')
      .innerJoin('loginMethod as lm', 'lm.userId', 'ua.id')
      .innerJoin('localLogin as ll', 'loginMethodId', 'lm.id')
      .select(['ua.email', 'll.password', 'ua.name', 'ua.id'])
      .where('ua.email', '=', userLogin.email)
      .executeTakeFirst();
    if (
      !user ||
      !(await this.hashService.verify(userLogin.password, user.password))
    ) {
      throw new UnauthorizedException({
        type: 'Authentication',
        message: ['Invalid username or password'],
      });
    }
    await this.sessionService.updateSession(sessionId, {
      user: { email: user.email },
    });
    return { success: true, displayName: user.name, id: user.id };
  }

  async logout(sessionId: string): Promise<void> {
    await this.sessionService.updateSession(sessionId, { user: {} });
  }

  private async creatLoginMethod(
    userId: string,
    type: LoginMethod['name']
  ): Promise<void> {
    await this.db
      .insertInto('loginMethod')
      .values({ userId, name: type })
      .executeTakeFirst();
  }

  private async createLocalLogin(
    userId: string,
    password: string
  ): Promise<void> {
    password = await this.hashService.hash(password);
    await this.db
      .insertInto('localLogin')
      .values(({ selectFrom }) => ({
        password: password,
        loginMethodId: selectFrom('loginMethod')
          .select(['id'])
          .where('userId', '=', userId)
          .where('name', '=', 'local')
          .limit(1),
        attempts: 0,
      }))
      .executeTakeFirst();
  }
}
