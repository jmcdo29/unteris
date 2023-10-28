import {
	Deity,
	Location,
	LoginBody,
	OverviewObject,
	PasswordReset,
	PasswordResetRequest,
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
		[key: `${typeof deitiesRoute}/category/${string}`]: [Array<OverviewObject>];
		[key: `${typeof deitiesRoute}/location/${string}`]: [Array<OverviewObject>];
		[key: `${typeof deitiesRoute}/id/${string}`]: [
			Omit<Deity, "imageId"> & { imageUrl: "string" },
		];
	};
};

type RaceRoutes = {
	get: {
		[raceRoute]: [Array<OverviewObject>];
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
			Array<OverviewObject>,
		];
	} & Record<
		`${typeof locationRoute}?type=${Location["type"]}`,
		[Array<OverviewObject>]
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
