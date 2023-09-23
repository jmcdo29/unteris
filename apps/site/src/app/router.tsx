import {
	EmailVerification,
	PasswordReset,
	UiAuth,
	User,
} from '@unteris/ui/auth';
import { Heading } from '@unteris/ui/components';
import { DeityNav } from '@unteris/ui/deities';
import { History } from '@unteris/ui/history';
import { UiRace } from '@unteris/ui/race';
import {
	RouteObject,
	createBrowserRouter,
	useRouteError,
} from 'react-router-dom';
import { Root } from './root';

import { Box, useTheme } from '@mui/material';
import { Welcome } from './welcome/welcome';

const ErrorBoundary = (): JSX.Element => {
	const error = useRouteError();
	const theme = useTheme();
	if (error instanceof Error) {
		return (
			<Root>
				<>
					<Heading text={error.name} />
					<details>
						<summary>{error.message}</summary>
						<Box
							sx={{
								fontFamily: 'monospace',
								margin: `0 ${theme.spacing(3)}`,
								backgroundColor: theme.palette.grey[700],
							}}
						>
							{error.stack}
						</Box>
					</details>
				</>
			</Root>
		);
	} else {
		return (
			<Root>
				<>
					<Heading text="Unknown Error" />
					<div>{`${error}`}</div>
				</>
			</Root>
		);
	}
};

const routes = (): RouteObject[] => {
	return [
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorBoundary />,
			children: [
				{ index: true, element: <Welcome /> },

				{
					path: '/history',
					element: <History />,
				},
				{
					path: '/deities',
					element: <DeityNav />,
				},
				{
					path: '/races',
					element: <UiRace />,
				},
				{
					path: '/login',
					element: <UiAuth />,
				},
				{
					path: '/verify',
					element: <EmailVerification />,
				},
				{
					path: '/me',
					element: <User />,
				},
				{
					path: '/reset-password',
					element: <PasswordReset />,
				},
			],
		},
	];
};

export const router = () => createBrowserRouter(routes());
