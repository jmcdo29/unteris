import { Injectable } from "@nestjs/common";
import type { RoleEnum } from "@unteris/server/common";
import {
	type Database,
	InjectKysely,
	LocalLogin,
	LoginMethod,
	UserAccount,
} from "@unteris/server/kysely";
import type { SignupUser } from "@unteris/shared/types";
import { type Kysely, sql } from "kysely";

@Injectable()
export class SecurityRepo {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

	async findUserByEmail(
		email: string,
	): Promise<Pick<UserAccount, "id"> | undefined> {
		return this.db
			.selectFrom("userAccount")
			.select(["id"])
			.where("email", "=", email)
			.executeTakeFirst();
	}

	async findUserById(
		id: string,
	): Promise<
		Array<Omit<UserAccount, "imageId" | "isVerified"> & { roles: RoleEnum }>
	> {
		return await this.db
			.selectFrom("userAccount as ua")
			.innerJoin("userPermission as perm", "perm.userId", "ua.id")
			.innerJoin("role as r", "r.id", "perm.roleId")
			.select(["ua.email", "ua.id", "ua.name", "r.name as roles"])
			.where("ua.id", "=", id)
			.execute();
	}

	async createUserRecord(user: SignupUser): Promise<Pick<UserAccount, "id">> {
		const newUser = await this.db
			.insertInto("userAccount")
			.values({
				email: user.email,
				name: user.name,
				isVerified: false,
			})
			.returning(["id"])
			.executeTakeFirstOrThrow();
		await this.db
			.insertInto("userPermission")
			.values((eb) => ({
				userId: newUser.id,
				roleId: eb.selectFrom("role").select("id").where("name", "=", "player"),
			}))
			.execute();
		return newUser;
	}

	async createUserVerificationRecord(id: string, token: string): Promise<void> {
		await this.db
			.insertInto("verificationToken")
			.values({
				userId: id,
				token,
				type: "verification",
			})
			.execute();
	}

	async findUserWithLocalLogin(email: string): Promise<
		Array<
			Pick<UserAccount, "id" | "name" | "email"> &
				Pick<LocalLogin, "password" | "attempts"> & {
					localLoginId: string;
					roles: string;
				}
		>
	> {
		return this.db
			.selectFrom("userAccount as ua")
			.innerJoin("loginMethod as lm", "lm.userId", "ua.id")
			.innerJoin("localLogin as ll", "loginMethodId", "lm.id")
			.innerJoin("userPermission as perm", "perm.userId", "ua.id")
			.innerJoin("role as r", "r.id", "perm.roleId")
			.select([
				"ua.email",
				"ua.name",
				"ua.id",
				"ll.password",
				"ll.attempts",
				"ll.id as localLoginId",
				"r.name as roles",
			])
			.where("ua.email", "=", email)
			.execute();
	}

	async incrementLoginAttemptsByLocalLoginId(id: string): Promise<void> {
		await this.db
			.updateTable("localLogin")
			.set((eb) => ({ attempts: eb("attempts", "+", 1) }))
			.where("id", "=", id)
			.execute();
	}

	async clearLoginAttemptsByLocalLoginId(id: string): Promise<void> {
		await this.db
			.updateTable("localLogin")
			.set({ attempts: 0 })
			.where("id", "=", id)
			.execute();
	}

	async createLoginMethodRecord(
		userId: string,
		name: LoginMethod["name"],
	): Promise<Pick<LoginMethod, "id">> {
		return await this.db
			.insertInto("loginMethod")
			.values({ userId, name })
			.returning(["id"])
			.executeTakeFirstOrThrow();
	}

	async createLocalLoginRecord(
		password: string,
		loginMethodId: string,
	): Promise<void> {
		await this.db
			.insertInto("localLogin")
			.values({
				password,
				loginMethodId,
				attempts: 0,
				lastUsed: new Date(),
			})
			.execute();
	}

	async setUserRecordAsActive(verificationToken: string): Promise<void> {
		const verificationRecord = await this.db
			.selectFrom("verificationToken")
			.select("userId")
			.where("token", "=", verificationToken)
			.where(sql`id::timestamp`, ">", sql`NOW() - INTERVAL '1 hour'`)
			.executeTakeFirst();
		if (!verificationRecord) {
			throw new Error(
				"Invalid verification token. If you clicked this from an email, please request a new token.",
			);
		}
		await this.db
			.updateTable("userAccount")
			.set({ isVerified: true })
			.where("id", "=", verificationRecord.userId)
			.executeTakeFirstOrThrow();
	}

	async createUserPasswordResetRecord(
		userId: string,
		token: string,
	): Promise<void> {
		await this.db
			.insertInto("verificationToken")
			.values({
				userId,
				token,
				type: "reset",
			})
			.executeTakeFirstOrThrow();
	}

	async findUserByResetToken(
		resetToken: string,
	): Promise<Pick<UserAccount, "id" | "email">> {
		return this.db
			.selectFrom("userAccount as u")
			.select(["u.id", "u.email"])
			.innerJoin("verificationToken as vt", "vt.userId", "u.id")
			.where(sql`vt.id::timestamp`, ">", sql`NOW() - INTERVAL '1 day'`)
			.where("vt.token", "=", resetToken)
			.executeTakeFirstOrThrow();
	}

	async updateUserPassword(userId: string, password: string): Promise<void> {
		await this.db
			.updateTable("localLogin")
			.set({ password })
			.where((eb) =>
				eb(
					"loginMethodId",
					"=",
					eb
						.selectFrom("loginMethod")
						.select(["id"])
						.where("userId", "=", userId),
				),
			)
			.executeTakeFirstOrThrow();
	}
}
