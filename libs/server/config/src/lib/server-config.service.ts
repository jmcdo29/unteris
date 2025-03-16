import { Inject, Injectable } from "@nestjs/common";
<<<<<<< HEAD
import * as v from "valibot";
=======
import { type Output, safeParse } from "valibot";
>>>>>>> 6631869 (chore: update code for biome rules)

import { SCHEMA } from "./config.constants";
import type { Config } from "./config.schema";

@Injectable()
export class ServerConfigService {
	private readonly config: v.InferOutput<typeof Config>;

	constructor(@Inject(SCHEMA) schema: typeof Config) {
		const result = v.safeParse(schema, process.env);
		if (!result.success) {
			throw new Error(
				result.issues
					.map(
						(i) =>
							`${i.message}: ${i.type} - ${i.path
								?.map((item) => item.key)
								.join(".")} w/ ${i.input}`,
					)
					.join("\n"),
			);
		}
		this.config = result.output;
	}

	get<T extends keyof v.InferOutput<typeof Config>>(
		key: T,
	): v.InferOutput<typeof Config>[T] {
		return this.config[key];
	}
}
