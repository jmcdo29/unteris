import { Inject, Injectable } from "@nestjs/common";
import { type Output, safeParse } from "valibot";

import { SCHEMA } from "./config.constants";
import type { Config } from "./config.schema";

@Injectable()
export class ServerConfigService {
	private readonly config: Output<typeof Config>;

	constructor(@Inject(SCHEMA) schema: typeof Config) {
		const result = safeParse(schema, process.env);
		if (!result.success) {
			throw new Error(
				result.issues
					.map(
						(i) =>
							`${i.message}: ${i.validation} - ${i.path
								?.map((item) => item.key)
								.join(".")} w/ ${i.input}`,
					)
					.join("\n"),
			);
		}
		this.config = result.output;
	}

	get<T extends keyof Output<typeof Config>>(key: T): Output<typeof Config>[T] {
		return this.config[key];
	}
}
