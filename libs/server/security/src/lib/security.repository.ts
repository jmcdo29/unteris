import { Injectable } from '@nestjs/common';
import { Database, InjectKysely } from '@unteris/server/kysely';
import {
  LocalLogin,
  LoginMethod,
  SignupUser,
  UserAccount,
} from '@unteris/shared/types';
import { Kysely, sql } from 'kysely';

@Injectable()
export class SecurityRepo {
  constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

  async findUserByEmail(
    email: string
  ): Promise<Pick<UserAccount, 'id'> | undefined> {
    return this.db
      .selectFrom('userAccount')
      .select(['id'])
      .where('email', '=', email)
      .executeTakeFirst();
  }

  async createUserRecord(user: SignupUser): Promise<Pick<UserAccount, 'id'>> {
    return this.db
      .insertInto('userAccount')
      .values({
        email: user.email,
        name: user.name,
        isVerified: false,
      })
      .returning(['id'])
      .executeTakeFirstOrThrow();
  }

  async createUserVerificationRecord(id: string, token: string): Promise<void> {
    await this.db
      .insertInto('verificationToken')
      .values({
        userId: id,
        token,
        type: 'verification',
      })
      .execute();
  }

  async findUserWithLocalLogin(
    email: string
  ): Promise<
    | (Pick<UserAccount, 'id' | 'name' | 'email'> &
        Pick<LocalLogin, 'password'>)
    | undefined
  > {
    return this.db
      .selectFrom('userAccount as ua')
      .innerJoin('loginMethod as lm', 'lm.userId', 'ua.id')
      .innerJoin('localLogin as ll', 'loginMethodId', 'lm.id')
      .select(['ua.email', 'll.password', 'ua.name', 'ua.id'])
      .where('ua.email', '=', email)
      .executeTakeFirst();
  }

  async createLoginMethodRecord(
    userId: string,
    name: LoginMethod['name']
  ): Promise<Pick<LoginMethod, 'id'>> {
    return await this.db
      .insertInto('loginMethod')
      .values({ userId, name })
      .returning(['id'])
      .executeTakeFirstOrThrow();
  }

  async createLocalLoginRecord(
    password: string,
    loginMethodId: string
  ): Promise<void> {
    await this.db
      .insertInto('localLogin')
      .values({
        password,
        loginMethodId,
        attempts: 0,
      })
      .execute();
  }

  async setUserRecordAsActive(verificationToken: string): Promise<void> {
    const verificationRecord = await this.db
      .selectFrom('verificationToken')
      .select('userId')
      .where('token', '=', verificationToken)
      .where(sql`id::timestamp`, '>', sql`CURRENT TIMESTAMP - '1 hour'`)
      .executeTakeFirst();
    if (!verificationRecord) {
      throw new Error(
        'Invalid verification token. If you clicked this from an email, please request a new token.'
      );
    }
    await this.db
      .updateTable('userAccount')
      .set({ isVerified: true })
      .where('id', '=', verificationRecord.userId)
      .executeTakeFirstOrThrow();
  }
}
