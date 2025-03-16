<<<<<<< HEAD
import { sdk, type types } from "@unteris/shared/sdk";
=======
import type { PasswordReset as PasswordResetBody } from "@unteris/shared/types";
>>>>>>> 6631869 (chore: update code for biome rules)
import {
	ActionButton,
	client,
	Grid,
	Heading,
	PasswordInput,
} from "@unteris/ui/components";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useNavigate, useSearchParams } from "react-router-dom";

const tokenAtom = atom<string | null>(null);
const passwordAtom = atom<string>("");
const passwordResetAtom = atom<types.PasswordResetDto>((get) => ({
	password: get(passwordAtom),
	resetToken: get(tokenAtom) ?? "",
}));

export const PasswordReset = (): JSX.Element => {
	const [queryParams] = useSearchParams();
	const setToken = useSetAtom(tokenAtom);
	const passwordResetBody = useAtomValue(passwordResetAtom);
	const [password, setPassword] = useAtom(passwordAtom);
	const navigate = useNavigate();

	setToken(queryParams.get("resetToken"));
	const submit = async () => {
		const _res = await sdk.serverSecurityControllerResetUserPasswordFromToken({
			client,
			body: passwordResetBody,
		});
		if (_res.error) {
			throw new Error(_res.error as unknown as string);
		}
		navigate("/login");
	};
	return (
		<Grid columns={1} sx={{ justifyItems: "center" }}>
			<Heading text="Password Reset" />
			<PasswordInput
				onUpdate={(e) => setPassword(e.target.value)}
				value={password}
				isSignup={true}
			/>
			<ActionButton
				text="Reset Password"
				action={submit}
				disabled={password.length < 12}
			/>
		</Grid>
	);
};
