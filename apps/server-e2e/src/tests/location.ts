import { randomUUID } from "node:crypto";
import { spec } from "pactum";
import { ulid } from "ulid";
import { describe, test } from "vitest";
import { signup } from "../auth";
import type { TestContext } from "../interfaces/test-context.interface";

export const locationTest = () =>
	describe("Location", () => {
		const testPass = randomUUID();
		test<TestContext>("A player should not be able to add a location", async () => {
			await signup({
				email: `${randomUUID()}@email.com`,
				name: randomUUID(),
				password: testPass,
			});
			await spec()
				.post(`/location/new`)
				.withBearerToken("$S{sessionToken}")
				.withJson({
					name: "Test Location",
					description: "What a beautiful city",
					type: "city",
				})
				.expectStatus(403);
		});
		test<TestContext>("A player should not be able to add a location", async (ctx) => {
			const newUser = await signup({
				email: `${randomUUID()}@email.com`,
				name: randomUUID(),
				password: testPass,
			});
			await ctx.db
				.insertInto("userPermission")
				.values((eb) => ({
					userId: newUser.id,
					roleId: eb
						.selectFrom("role")
						.select("id")
						.where("role.name", "=", "admin"),
				}))
				.execute();
			await spec()
				.post(`/location/new`)
				.withBearerToken("$S{sessionToken}")
				.withJson({
					name: `Test Location ${ulid()}`,
					description: "What a beautiful city",
					type: "city",
				})
				.expectStatus(201);
		});
	});
