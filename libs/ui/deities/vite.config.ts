import react from "@vitejs/plugin-react";
/// <reference types="vitest" />
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	cacheDir: "../../../node_modules/.vite/ui-deities",

	plugins: [
		react(),
		viteTsConfigPaths({
			root: "../../../",
		}),
	],

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
