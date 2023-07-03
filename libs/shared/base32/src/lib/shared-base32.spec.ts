import { sharedBase32 } from './shared-base32';

describe('sharedBase32', () => {
  it('should work', () => {
    expect(sharedBase32()).toEqual('shared-base32');
  });
});
