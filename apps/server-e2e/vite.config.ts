import { typeschemaPlugin } from "@decs/typeschema/vite";
import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		reporters: ["default"],
		include: ["src/main.ts"],
	},
	mode: "development",
	plugins: [
		tsconfigPaths(),
		swc.vite({
			module: { type: "es6" },
		}),
		typeschemaPlugin(),
	],
});
