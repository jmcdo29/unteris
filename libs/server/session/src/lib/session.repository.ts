import { Injectable } from "@nestjs/common";
import { SessionData } from "@unteris/server/common";
import { Database, InjectKysely } from "@unteris/server/kysely";
import { Insertable, Kysely } from "kysely";

@Injectable()
export class SessionRepository {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async getById(id: string): Promise<SessionData> {
		const result = await this.db
			.selectFrom("userSession as session")
			.innerJoin("userAccount as user", "session.userId", "user.id")
			.select(["session.id", "user.email", "user.id as userId"])
			.where("session.id", "=", id)
			.executeTakeFirstOrThrow();
		return {
			id: result.id,
			user: {
				id: result.userId,
				email: result.email,
			},
		};
	}

	async getFullById(id: string): Promise<Database["userSession"]> {
		return await this.db
			.selectFrom("userSession")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirstOrThrow();
	}

	async createOne(data: Insertable<Database["userSession"]>): Promise<boolean> {
		await this.db.insertInto("userSession").values([data]).execute();
		return true;
	}

	async deleteOne(id: string): Promise<boolean> {
		const res = await this.db
			.deleteFrom("userSession")
			.where("id", "=", id)
			.execute();
		if (Number(res[0].numDeletedRows) === 0) {
			return false;
		}
		return true;
	}

	async setLastUsedTime(id: string): Promise<void> {
		await this.db
			.updateTable("userSession")
			.set({ lastUsed: new Date().toUTCString() })
			.where("id", "=", id)
			.execute();
	}
}
