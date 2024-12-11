import { Output, object, string } from "valibot";

export const CsrfReturnSchema = object({
	csrfToken: string(),
});

export type CsrfReturn = Output<typeof CsrfReturnSchema>;
