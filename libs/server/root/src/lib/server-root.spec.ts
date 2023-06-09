import { serverRoot } from './server-root';

describe('serverRoot', () => {
  it('should work', () => {
    expect(serverRoot()).toEqual('server-root');
  });
});
