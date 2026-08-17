import { sdk, type types } from "@unteris/shared/sdk";
import { userAtom } from "@unteris/ui/atoms";
import {
	ActionButton,
	client,
	convertUnknownErrorToDisplayError,
	Heading,
	PasswordInput,
	TextInput,
} from "@unteris/ui/components";
import { useAtom, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { authErrorAtom, authUserAtom, displayErrorAtom } from "./auth.atoms";

export const Register = (): JSX.Element => {
	const setUser = useSetAtom(userAtom);
	const setAuthError = useSetAtom(authErrorAtom);
	const setDisplayError = useSetAtom(displayErrorAtom);
	const [newUser, setNewUser] = useAtom(authUserAtom);
	const navigate = useNavigate();
	const updateField =
		(field: keyof types.SignupBodyDto) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setNewUser({ ...newUser, [field]: e.target.value });
		};
	const submit = async () => {
		try {
			const { error, data: res } = await sdk.serverSecurityControllerSignup({
				client,
				body: newUser,
			});
			if (error || !res) {
				throw new Error(error as unknown as string);
			}
			setUser({
				id: res.id,
				email: newUser.email,
				displayName: newUser.name,
				roles: ["player"],
			});
			sessionStorage.setItem("sessionId", res.sessionId);
			setNewUser({
				email: "",
				password: "",
				name: "",
			});
			navigate("/");
		} catch (e) {
			setAuthError(convertUnknownErrorToDisplayError(e, "Registration Error"));
			setDisplayError(true);
		}
	};
	return (
		<>
			<Heading text="Register" />
			<TextInput
				value={newUser.email}
				label="Email"
				type="email"
				required={true}
				onUpdate={updateField("email")}
			/>
			<TextInput
				value={newUser.name}
				label="Display Name"
				required={true}
				onUpdate={updateField("name")}
			/>
			<PasswordInput
				value={newUser.password}
				onUpdate={updateField("password")}
				isSignup={true}
			/>
			<ActionButton action={submit} text="Register" />
		</>
	);
};
