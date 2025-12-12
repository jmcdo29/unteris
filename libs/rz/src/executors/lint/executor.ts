import {
	type ExecutorContext,
	getPackageManagerCommand,
	runExecutor as nxExecutor,
} from "@nx/devkit";
import { Ogma } from "@ogma/logger";
import { style } from "@ogma/styler";
import { spawn } from "child_process";
import { appendFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { LintExecutorSchema } from "./schema";

export default async function runExecutor(
	options: LintExecutorSchema,
	context: ExecutorContext,
) {
	const logger = new Ogma({
		application: "Rz Plugin - Biome",
		context: context.projectName,
		logLevel: options.verbose ? "ALL" : "INFO",
	});
	try {
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
				args.push("--write", "--unsafe");
			} else {
				args.push("--write");
			}
		}
		args.push("--colors=force");
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
			// biome-ignore lint/suspicious/noControlCharactersInRegex: explicitly searching for escape characters
			const SRGRegex = /\x1B\[\d\d?m/g;
			// biome-ignore lint/suspicious/noControlCharactersInRegex: explicitly searching for escape characters
			const linkRegex = /\x1B\]8;;.*\x1B\\/g;
			// biome-ignore lint/suspicious/noControlCharactersInRegex: explicitly searching for escape characters
			const linkEndRegex = /\x1B\]8;;\x1B\\/g;
			const dataHandler = (dataArray: string[]) => (chunk: Buffer) => {
				const chunkString = chunk.toString();
				if (!dataArray.length) {
					dataArray.push(chunkString);
				} else {
					dataArray[dataArray.length - 1] += chunkString;
				}
			};

			const errorOutput: string[] = [];
			const dataOutput: string[] = [];
			biomeCommand.stdout.on("data", dataHandler(dataOutput));
			biomeCommand.stdout.on("error", dataHandler(errorOutput));

			biomeCommand.stderr.on("data", dataHandler(errorOutput));
			biomeCommand.stderr.on("error", dataHandler(errorOutput));

			biomeCommand.on("close", (code) => {
				if (dataOutput.length) {
					logger.log(["\n", ...dataOutput], { each: true });
					appendFileSync(
						lintCacheFile,
						dataOutput
							.join("\n")
							.replaceAll(SRGRegex, "")
							.replaceAll(linkRegex, " ")
							.replaceAll(linkEndRegex, ""),
					);
				}
				if (errorOutput.length) {
					logger.error(["\n", ...errorOutput], { each: true });
					appendFileSync(
						errorCacheFile,
						errorOutput
							.join("\n")
							.replaceAll(SRGRegex, "")
							.replaceAll(linkRegex, " ")
							.replaceAll(linkEndRegex, ""),
					);
				}
				resolve({ success: code === 0 });
			});
			biomeCommand.on("error", (err) => {
				logger.error(["\n", ...errorOutput], { each: true });
				appendFileSync(
					errorCacheFile,
					errorOutput
						.join("\n")
						.replaceAll(SRGRegex, "")
						.replaceAll(linkRegex, " ")
						.replaceAll(linkEndRegex, ""),
				);
				logger.printError(err);
				resolve({ success: false });
			});
		});
		return biomeRun;
	} catch (err) {
		logger.error(err);
		return { success: false };
	}
}
