import {
	Deity,
	Location,
	LoginBody,
	PasswordReset,
	PasswordResetRequest,
	Race,
	RaceWithAbilities,
	SignupUser,
	UserAccount,
	authRoute,
	csrfRoute,
	deitiesRoute,
	locationRoute,
	raceRoute,
	sessionRoute,
} from "@unteris/shared/types";
import { AnySchema, Output } from "valibot";

export type method = "get" | "post" | "patch" | "put" | "delete";

type PathToTypeMap = Record<string, [Output<AnySchema>, Output<AnySchema>?]>;

export type SdkGeneric = Record<method, PathToTypeMap>;

type DeityRoutes = {
	get: {
		[key: `${typeof deitiesRoute}/category/${string}`]: [
			Array<Pick<Deity, "id" | "name">>,
		];
		[key: `${typeof deitiesRoute}/location/${string}`]: [
			Array<Pick<Deity, "id" | "name">>,
		];
		[key: `${typeof deitiesRoute}/id/${string}`]: [
			Omit<Deity, "imageId"> & { imageUrl: "string" },
		];
	};
};

type RaceRoutes = {
	get: {
		[raceRoute]: [Array<Pick<Race, "id" | "name">>];
		[key: `${typeof raceRoute}/${string}`]: [RaceWithAbilities];
	};
};

type SecurityRoutes = {
	get: {
		[key: `${typeof authRoute}/verify-email?verificationToken=${string}`]: [
			{ success: boolean },
		];
		[csrfRoute]: [{ csrfToken: string }];
	} & Record<`${typeof authRoute}/me`, [UserAccount]> &
		Record<`${typeof sessionRoute}/refresh`, [{ success: boolean }]>;
	post:
		| Record<`${typeof csrfRoute}/verify`, [{ success: boolean }]> &
				Record<
					`${typeof authRoute}/signup`,
					[{ success: boolean; id: UserAccount["id"] }, SignupUser]
				> &
				Record<
					`${typeof authRoute}/login`,
					[
						{
							success: boolean;
							id: UserAccount["id"];
							displayName: UserAccount["name"];
						},
						LoginBody,
					]
				> &
				Record<`${typeof authRoute}/logout`, [{ success: boolean }]> &
				Record<
					`${typeof authRoute}/password-reset-request`,
					[{ success: boolean }, PasswordResetRequest]
				> &
				Record<
					`${typeof authRoute}/password-reset`,
					[{ success: boolean }, PasswordReset]
				>;
};

type LocationRoutes = {
	get: {
		[key: `${typeof locationRoute}/id/${string}`]: [
			Omit<Location, "imageId"> & { imageUrl: string },
		];
		[key: `${typeof locationRoute}/by-parent/${string}`]: [
			Array<Pick<Location, "id" | "name">>,
		];
	} & Record<
		`${typeof locationRoute}?type=${Location["type"]}`,
		[Array<Pick<Location, "id" | "name">>]
	>;
};

export type RouteToType = DeityRoutes &
	LocationRoutes &
	RaceRoutes &
	SecurityRoutes & {
		patch: PathToTypeMap;
		put: PathToTypeMap;
		delete: PathToTypeMap;
	};
