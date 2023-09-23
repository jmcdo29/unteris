import { Test } from '@nestjs/testing';
import { ServerLocationService } from './server-location.service';

describe('ServerLocationService', () => {
	let service: ServerLocationService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ServerLocationService],
		}).compile();

		service = module.get(ServerLocationService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
