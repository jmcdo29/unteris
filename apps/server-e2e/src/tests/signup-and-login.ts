import { base32 } from '@unteris/shared/base32';
import { spec } from 'pactum';
import { regex } from 'pactum-matchers';
import { describe, expect, test } from 'vitest';
import { DbContext } from '../interfaces/test-context.interface';

export const signUpAndLoginTests = () => {
  return describe('SignUp and Login', () => {
    test<DbContext>('A new user should be able to sign up', async (context) => {
      const res = await spec()
        .post('/auth/signup')
        .withBody({
          email: 'test@testing.com',
          password: 'ALongEnoughP4ssw0rdToBeFin3',
          confirmationPassword: 'ALongEnoughP4ssw0rdToBeFin3',
          name: 'Test User',
        })
        .expectStatus(201)
        .expectJsonMatch({
          id: regex(base32),
          success: true,
        })
        .returns('.id');
      // assert we properly made the user, login method, and related local login
      const userAccount = await context.db
        .selectFrom('userAccount as ua')
        .innerJoin('loginMethod as lm', 'lm.id', 'ua.id')
        .innerJoin('localLogin as ll', 'll.loginMethodId', 'lm.id')
        .select(({ fn }) => [fn.count('ua.id').as('count')])
        .where('ua.id', '=', res)
        .execute();
      expect(userAccount[0].count).toBe(1);
      await spec()
        .post('auth/login')
        .withBody({
          email: 'test@testing.com',
          password: 'ALongEnoughP4ssw0rdToBeFin3',
        })
        .expectJson({
          success: true,
        })
        .expectStatus(201)
        .expect(({ res: _res }) => {
          // assert session token here
        });
    });
  });
};
