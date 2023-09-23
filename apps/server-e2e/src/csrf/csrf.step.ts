// @ts-expect-error no types for lightcookie
import { parse } from "lightcookie";
import { spec } from "pactum";

export const csrfSpec = () =>
	spec()
		.get("/csrf")
		.expectStatus(200)
		.stores("csrfToken", ".csrfToken")
		.stores((_req, res) => {
			const { csrfToken } = res.body;
			const cookies = res.headers["set-cookie"];
			if (!cookies || cookies.length === 0) {
				throw new Error("Received no cookies from the server");
			}
			const sessionId = cookies
				.map((c) => parse(c))
				.find((cookie) => "sessionId" in cookie)?.sessionId;
			const refreshId = cookies
				.map((c) => parse(c))
				.find((cookie) => "refreshId" in cookie)?.refreshId;
			return {
				csrfToken,
				sessionId,
				refreshId,
			};
		});
