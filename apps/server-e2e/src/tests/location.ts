import { randomUUID } from "crypto";
import { csrfHeader, locationRoute } from "@unteris/shared/types";
import { spec } from "pactum";
import { describe, test, vi } from "vitest";
import { signup } from "../auth";
import { csrfStoreToken } from "../csrf";
import { TestContext } from "../interfaces/test-context.interface";

export const locationTest = () => {
	return describe("Location", () => {
		const testPass = randomUUID();
		test<TestContext>("A player should not be able to add a location", async () => {
			await signup({
				email: `${randomUUID()}@email.com`,
				name: randomUUID(),
				password: testPass,
			});
			await spec()
				.post(`/${locationRoute}/new`)
				.withHeaders(csrfHeader, csrfStoreToken)
				.withJson({
					name: "Test Location",
					description: "What a beautiful city",
					type: "city",
				})
				.expectStatus(403);
		});
	});
};
