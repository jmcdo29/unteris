import { Link, useTheme } from '@mui/material';
import { Grid, Heading, sdk } from '@unteris/ui/components';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

const tokenAtom = atom<string | null>(null);
const verifiedEmailStateAtom = atom(async (get) => {
	const token = get(tokenAtom);
	if (!token) {
		return false;
	}
	const res = await sdk.verifyEmail(token);
	if (res.success) {
		return true;
	} else {
		return false;
	}
});

const Header = () => {
	const [queryParams] = useSearchParams();
	const setToken = useSetAtom(tokenAtom);
	setToken(queryParams.get('token'));
	return <Heading text="Email Verification" />;
};

const Body = () => {
	const isEmailVerified = useAtomValue(verifiedEmailStateAtom);
	return (
		<>
			{isEmailVerified ? (
				<p>Thank you for verifying your email</p>
			) : (
				<div>
					We could not verify your email at this time. Please double check your
					email, and submit a request for a new verification token on the{' '}
					<Link href="/me">Users</Link> page.
				</div>
			)}
		</>
	);
};

export const EmailVerification = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid columns={1} sx={{ justifyItems: 'center', rowGap: theme.spacing(2) }}>
			<Header />
			<Suspense fallback="Loading...">
				<Body />
			</Suspense>
		</Grid>
	);
};
