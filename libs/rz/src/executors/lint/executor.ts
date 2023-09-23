import { spawn } from "child_process";
import { appendFileSync, mkdirSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import {
	ExecutorContext,
	getPackageManagerCommand,
	runExecutor as nxExecutor,
} from "@nx/devkit";
import { Ogma } from "@ogma/logger";
import { style } from "@ogma/styler";
import { LintExecutorSchema } from "./schema";

export default async function runExecutor(
	options: LintExecutorSchema,
	context: ExecutorContext,
) {
	try {
		const logger = new Ogma({
			application: "Rz Plugin - Biome",
			context: context.projectName,
			logLevel: options.verbose ? "ALL" : "INFO",
		});
		const lintForProject = `${style.cyan.apply(
			"nx-lint",
		)} for the ${style.magenta.apply(context.projectName ?? "")} project`;
		logger.log(`Running ${lintForProject}`);
		for await (const s of await nxExecutor(
			{ target: "nx-lint", project: context.projectName ?? "" },
			{},
			context,
		)) {
			if (!s.success) {
				logger.error(`There was an error running ${lintForProject}`);
				return { success: false };
			}
		}
		const root =
			context.projectsConfigurations?.projects[context.projectName ?? ""]
				.root ?? "";
		const args: string[] = [];
		if (options.apply === undefined || options.apply) {
			if (options.unsafe) {
				args.push("--apply-unsafe");
			} else {
				args.push("--apply");
			}
		}
		const cachePath = join(
			process.cwd(),
			"tmp",
			"rz",
			"lint",
			context.projectName ?? "",
		);
		const lintCacheFile = join(cachePath, "lint.txt");
		const errorCacheFile = join(cachePath, "error.txt");
		mkdirSync(cachePath, { recursive: true });
		writeFileSync(lintCacheFile, "");
		writeFileSync(errorCacheFile, "");
		const biomeRun = await new Promise<{ success: boolean }>((resolve) => {
			const command = `${getPackageManagerCommand().exec} biome check`;
			logger.log(
				`Executing ${style.blue.apply(
					`${[command, ...args, root].join(" ")}`,
				)}`,
			);
			const [biome, ...pnArgs] = command.split(" ");
			const biomeCommand = spawn(biome, [...pnArgs, ...args, root]);
			biomeCommand.stdout.on("data", (chunk) => {
				logger.log(chunk.toString());
				appendFileSync(lintCacheFile, chunk.toString());
			});

			biomeCommand.stderr.on("data", (chunk) => {
				logger.error(chunk.toString());
				appendFileSync(errorCacheFile, chunk.toString());
			});
			biomeCommand.on("close", (code) => resolve({ success: code === 0 }));
			biomeCommand.on("error", (err) => {
				logger.printError(err);
				resolve({ success: false });
			});
		});
		return biomeRun;
	} catch (err) {
		console.error(err);
		return { success: false };
	}
}
