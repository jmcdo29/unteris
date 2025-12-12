/// <reference types="vitest/config" />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig } from "vite";

export default defineConfig({
	cacheDir: "../../../node_modules/.vite/shared-base32",

	plugins: [nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [
	//    viteTsConfigPaths({
	//      root: '../../../',
	//    }),
	//  ],
	// },

	test: {
		reporters: ["default"],
		globals: true,
		cache: {
			dir: "../../../node_modules/.vitest",
		},
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
	},
});
