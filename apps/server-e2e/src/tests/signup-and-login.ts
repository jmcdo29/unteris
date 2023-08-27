import { base32Regex } from '@unteris/shared/base32';
import { randomUUID } from 'crypto';
import { parse } from 'lightcookie';
import { spec } from 'pactum';
import { regex } from 'pactum-matchers';
import { describe, expect, test } from 'vitest';
import { DbContext } from '../interfaces/test-context.interface';

export const signUpAndLoginTests = () => {
  return describe('SignUp and Login', () => {
    test<DbContext>('A new user should be able to sign up', async (context) => {
      await spec()
        .get('/csrf')
        .expectStatus(200)
        .stores('csrfToken', '.csrfToken')
        .stores((_req, res) => {
          const { csrfToken } = res.body;
          const cookies = res.headers['set-cookie'];
          if (!cookies || cookies.length === 0) {
            throw new Error('Received no cookies from the server');
          }
          const sessionId = cookies
            .map((c) => parse(c))
            .find((cookie) => 'sessionId' in cookie)?.sessionId;
          const refreshId = cookies
            .map((c) => parse(c))
            .find((cookie) => 'refreshId' in cookie)?.refreshId;
          return {
            csrfToken,
            sessionId,
            refreshId,
          };
        });
      const email = `${randomUUID()}@testing.com`;
      const name = 'Test User' + randomUUID();
      const res = await spec()
        .post('/auth/signup')
        .withBody({
          email,
          password: 'ALongEnoughP4ssw0rdToBeFin3',
          confirmationPassword: 'ALongEnoughP4ssw0rdToBeFin3',
          name,
        })
        .withHeaders('X-UNTERIS-CSRF-PROTECTION', '$S{csrfToken}')
        .withCookies('sessionId', '$S{sessionId}')
        .expectStatus(201)
        .expectJsonMatch({
          id: regex(base32Regex),
          success: true,
        })
        .returns('.id');
      // assert we properly made the user, login method, and related local login
      const userAccount = await context.db
        .selectFrom('userAccount as ua')
        .innerJoin('loginMethod as lm', 'lm.userId', 'ua.id')
        .innerJoin('localLogin as ll', 'll.loginMethodId', 'lm.id')
        .select(({ fn }) => [fn.count('ua.id').as('count')])
        .where('ua.id', '=', res)
        .execute();
      expect(userAccount[0].count).toBe('1');
      await spec()
        .post('/auth/login')
        .withBody({
          email,
          password: 'ALongEnoughP4ssw0rdToBeFin3',
        })
        .withHeaders('X-UNTERIS-CSRF-PROTECTION', '$S{csrfToken}')
        .withCookies('sessionId', '$S{sessionId}')
        .expectStatus(201)
        .expectJsonMatch({
          displayName: name,
          id: regex(base32Regex),
          success: true,
        });
    });
  });
};
