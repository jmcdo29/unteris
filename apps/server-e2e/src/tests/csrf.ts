import { parse } from 'lightcookie';
import { spec } from 'pactum';
import { Callback } from 'uvu';
import { ok, unreachable } from 'uvu/assert';

export const csrfTests: Callback<any> = async (_context: any) => {
  await spec()
    .get('/csrf')
    .expectStatus(200)
    .expectJsonLike({ csrfToken: /\w+/ })
    .expect(({ res }) => {
      const cookies = res.headers['set-cookie'];
      if (!cookies || cookies.length === 0) {
        unreachable('Received no cookies from the server');
        return;
      }
      cookies.forEach((cookie) => {
        const parsed = parse(cookie);
        ok(
          ['sessionId', 'refreshId'].some((cookieName) => {
            return cookieName in parsed;
          })
        );
      });
    })
    .stores((_req, res) => {
      const { csrfToken } = res.body;
      const cookies = res.headers['set-cookie'];
      if (!cookies || cookies.length === 0) {
        unreachable('Received no cookies from the server');
        return;
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
    })
    .toss();
  await spec()
    .post('/csrf/verify')
    .withHeaders('X-UNTERIS-CSRF-PROTECTION', '$S{csrfToken}')
    .withCookies('sessionId', '$S{sessionId}')
    .expectStatus(201)
    .expectJson({ success: true })
    .toss();
};
