import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ServerHashService } from '@unteris/server/hash';
import { Database, InjectKysely } from '@unteris/server/kysely';
import { ServerSessionService } from '@unteris/server/session';
import {
  UserAccount,
  LoginMethod,
  LoginBody,
  SignupUser,
} from '@unteris/shared/types';
import { Kysely } from 'kysely';

@Injectable()
export class ServerSecurityService {
  constructor(
    @InjectKysely() private readonly db: Kysely<Database>,
    private readonly sessionService: ServerSessionService,
    private readonly hashService: ServerHashService
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
      throw new BadRequestException(
        `Email ${newUser.email} is already taken. Did you mean to login?`
      );
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
    return { success: true, id: createdUser.id };
  }

  async logUserIn(userLogin: LoginBody): Promise<{ success: boolean }> {
    console.log(userLogin);
    const user = await this.db
      .selectFrom('userAccount as ua')
      .innerJoin('loginMethod as lm', 'lm.userId', 'id')
      .innerJoin('localLogin as ll', 'loginMethodId', 'lm.id')
      .select(['ua.email', 'll.password'])
      .where('ua.email', '=', userLogin.email)
      .executeTakeFirst();
    if (
      !user ||
      !(await this.hashService.verify(userLogin.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid username or password');
    }
    await this.sessionService.updateSession('', {
      user: { email: user.email },
    });
    return { success: true };
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
