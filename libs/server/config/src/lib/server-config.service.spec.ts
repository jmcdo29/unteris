import { Test } from "@nestjs/testing";
import { ServerConfigService } from "./server-config.service";

describe("ServerConfigService", () => {
	let service: ServerConfigService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ServerConfigService],
		}).compile();

		service = module.get(ServerConfigService);
	});

	it("should be defined", () => {
		expect(service).toBeTruthy();
	});
});
