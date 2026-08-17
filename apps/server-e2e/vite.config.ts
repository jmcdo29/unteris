import { typeschemaPlugin } from "@decs/typeschema/vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		reporters: ["default"],
		include: ["src/main.ts"],
	},
	mode: "development",
	plugins: [
		nxViteTsPaths(),
		swc.vite({
			module: { type: "es6" },
		}),
		typeschemaPlugin(),
	],
});
