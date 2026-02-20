import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "http://localhost:3333/open-api-json",
	output: "./libs/shared/sdk/src/lib",
});
