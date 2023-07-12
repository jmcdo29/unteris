import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import { postFetch } from '@unteris/ui/components';
import { useAtomValue, useSetAtom } from 'jotai';

interface UserProps {
  user: {
    displayName: string;
  };
}

export const User = (props: UserProps): JSX.Element => {
  const setUser = useSetAtom(userAtom);
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
        {props.user.displayName}
      </Typography>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
