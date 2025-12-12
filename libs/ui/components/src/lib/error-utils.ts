import type { DisplayError } from "./error-display";

interface ValibotError {
	path: string;
	message: string;
}

interface ValidationError {
	type: "Validation";
	message: ValibotError[];
}

interface AuthenticationError {
	type: "Authentication";
	message: string[];
}

type ErrorFromServer = (ValidationError | AuthenticationError) & {
	[key: string]: unknown;
};

const isObject = (val: unknown): val is Record<string, unknown> =>
	typeof val === "object" && val !== null;

const isServerError = (obj: Record<string, unknown>): obj is ErrorFromServer =>
	"type" in obj && typeof obj.type === "string" && "message" in obj;

export const convertUnknownErrorToDisplayError = (
	error: unknown,
	title = "Error",
): DisplayError => {
	let err = error;
	if (
		typeof err === "object" &&
		err !== null &&
		"message" in err &&
		typeof err.message === "string"
	) {
		try {
			err = JSON.parse(err.message);
		} catch {
			/* no op */
		}
	}
	if (err === null) {
		return {
			title: "Internal Error",
			messages: ["An unknown error has occurred"],
		};
	}
	if (
		isObject(err) &&
		"body" in err &&
		isObject(err.body) &&
		isServerError(err.body)
	) {
		switch (err.body.type) {
			case "Validation":
				return convertValidationErrorToDisplayError(err.body, title);
			case "Authentication":
				return { title: "Authentication Error", messages: err.body.message };
			default:
				return {
					title: "Unknown Server Error",
					messages: ["If this persists, contact the server admin"],
				};
		}
	}
	return {
		title: "Unknown Error",
		messages: [
			"How did you even do this? Contact the server admin and share your exact steps",
		],
	};
};

export const convertValidationErrorToDisplayError = (
	err: ValidationError,
	title = "Validation Error",
): DisplayError => ({
	title,
	messages: err.message.map((m) => m.message),
});
