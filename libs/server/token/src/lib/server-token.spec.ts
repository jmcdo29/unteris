import { serverToken } from "./server-token";

describe("serverToken", () => {
	it("should work", () => {
		expect(serverToken()).toEqual("server-token");
	});
});
