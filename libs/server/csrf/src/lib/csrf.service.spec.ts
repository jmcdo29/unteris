import { Test } from "@nestjs/testing";
import { ServerCsrfService } from "./csrf.service";

describe("ServerCsrfService", () => {
	let service: ServerCsrfService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ServerCsrfService],
		}).compile();

		service = module.get(ServerCsrfService);
	});

	it("should be defined", () => {
		expect(service).toBeTruthy();
	});
});
