import { Inject, Injectable } from '@nestjs/common';
import { parse, Output } from 'valibot';

import { SCHEMA } from './config.constants';
import { Config } from './config.schema';

@Injectable()
export class ServerConfigService {
	private readonly config: Output<typeof Config>;

	constructor(@Inject(SCHEMA) schema: typeof Config) {
		this.config = parse(schema, process.env);
	}

	get<T extends keyof Output<typeof Config>>(key: T): Output<typeof Config>[T] {
		return this.config[key];
	}
}
