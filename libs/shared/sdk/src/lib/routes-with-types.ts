import {
	CsrfReturn,
	Deity,
	Location,
	LocationWithImage,
	LoginBody,
	LoginResponse,
	OverviewObject,
	PasswordReset,
	PasswordResetRequest,
	RaceWithAbilities,
	SignupUser,
	Success,
	UserAccount,
	authRoute,
	csrfRoute,
	deitiesRoute,
	locationRoute,
	raceRoute,
	sessionRoute,
} from "@unteris/shared/types";

export type method = "get" | "post" | "patch" | "put" | "delete";

type PathToTypeMap = Record<string, [unknown, unknown?]>;

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
			Success,
		];
		[csrfRoute]: [CsrfReturn];
	} & Record<`${typeof authRoute}/me`, [UserAccount]> &
		Record<`${typeof sessionRoute}/refresh`, [Success]>;
	post:
		| Record<`${typeof csrfRoute}/verify`, [Success]> &
				Record<
					`${typeof authRoute}/signup`,
					[Success & { id: UserAccount["id"] }, SignupUser]
				> &
				Record<`${typeof authRoute}/login`, [LoginResponse, LoginBody]> &
				Record<`${typeof authRoute}/logout`, [Success]> &
				Record<
					`${typeof authRoute}/password-reset-request`,
					[Success, PasswordResetRequest]
				> &
				Record<`${typeof authRoute}/password-reset`, [Success, PasswordReset]>;
};

type LocationRoutes = {
	get: {
		[key: `${typeof locationRoute}/id/${string}`]: [LocationWithImage];
		[key: `${typeof locationRoute}/by-parent/${string}`]: [
			Array<OverviewObject>,
		];
	} & Record<
		`${typeof locationRoute}?type=${Location["type"]}`,
		[Array<OverviewObject>]
	>;
	post: Record<`${typeof locationRoute}/new`, [Location, FormData]>;
	patch: {
		[key: `${typeof locationRoute}/update/${string}`]: [Success, FormData];
	};
};

export type RouteToType = DeityRoutes &
	LocationRoutes &
	RaceRoutes &
	SecurityRoutes & {
		patch: PathToTypeMap;
		put: PathToTypeMap;
		delete: PathToTypeMap;
	};
