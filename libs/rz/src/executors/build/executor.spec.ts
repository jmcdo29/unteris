import executor from "./executor";
import type { BuildExecutorSchema } from "./schema";

const options: BuildExecutorSchema = {};

describe("Build Executor", () => {
	it("can run", async () => {
		const output = await executor(options);
		expect(output.success).toBe(true);
	});
});
