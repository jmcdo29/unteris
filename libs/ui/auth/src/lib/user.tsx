import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import { postFetch } from '@unteris/ui/components';
import { useAtom, useAtomValue } from 'jotai';

export const User = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const logout = async () => {
    await postFetch({
      endpoint: 'auth/logout',
      body: {},
      csrfToken,
    });
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
