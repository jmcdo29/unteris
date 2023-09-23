import { serverSession } from './server-session';

describe('serverSession', () => {
	it('should work', () => {
		expect(serverSession()).toEqual('server-session');
	});
});
