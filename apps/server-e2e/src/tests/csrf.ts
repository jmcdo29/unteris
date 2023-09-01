import { spec } from 'pactum';
import { describe, test } from 'vitest';
import { csrfSpec, csrfStoreToken, sessionStoreToken } from '../csrf';

export const csrfTest = () => {
  return describe('CSRF Tests', () => {
    test('CSRF Testing', async () => {
      await csrfSpec();
      await spec()
        .post('/csrf/verify')
        .withHeaders('X-UNTERIS-CSRF-PROTECTION', csrfStoreToken)
        .withCookies('sessionId', sessionStoreToken)
        .expectStatus(201)
        .expectJson({ success: true })
        .toss();
    });
  });
};
