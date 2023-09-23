import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { userAtom } from '@unteris/ui/atoms';
import { sdk } from '@unteris/ui/components';
import { useAtom } from 'jotai';

export const User = (): JSX.Element => {
	const [user, setUser] = useAtom(userAtom);
	const logout = async () => {
		await sdk.logout();
		setUser({ id: '', email: '', displayName: '' });
	};
	return (
		<div>
			<Typography variant="h2" fontSize={'2em'}>
				{user.displayName}
			</Typography>
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};
