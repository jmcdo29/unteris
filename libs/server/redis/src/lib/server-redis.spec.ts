import { serverRedis } from './server-redis';

describe('serverRedis', () => {
  it('should work', () => {
    expect(serverRedis()).toEqual('server-redis');
  });
});
