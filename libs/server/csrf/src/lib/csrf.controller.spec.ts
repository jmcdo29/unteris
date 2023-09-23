import { Test } from '@nestjs/testing';
import { ServerCsrfController } from './csrf.controller';
import { ServerCsrfService } from './csrf.service';

describe('ServerCsrfController', () => {
	let controller: ServerCsrfController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ServerCsrfService],
			controllers: [ServerCsrfController],
		}).compile();

		controller = module.get(ServerCsrfController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
