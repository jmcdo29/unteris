import { base32 } from '@unteris/shared/base32';
import { spec } from 'pactum';
import { regex } from 'pactum-matchers';
import { describe, test } from 'vitest';
import { DbContext } from '../interfaces/test-context.interface';

export const signUpAndLoginTests = () => {
  return describe('SignUp and Login', () => {
    test<DbContext>('A new user should be able to sign up', async (_context) => {
      await spec()
        .post('/auth/signup')
        .withBody({
          email: 'test@testing.com',
          password: 'ALongEnoughP4ssw0rdToBeFin3',
          confirmationPassword: 'ALongEnoughP4ssw0rdToBeFin3',
          name: 'Test User',
        })
        .expectJsonMatch({
          id: regex(base32),
          success: true,
        })
        .toss();
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
        })
        .toss();
    });
  });
};
