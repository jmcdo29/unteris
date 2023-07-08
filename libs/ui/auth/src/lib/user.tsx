import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { userAtom } from '@unteris/ui/atoms';
import { useSetAtom } from 'jotai';

interface UserProps {
  user: {
    displayName: string;
  };
}

export const User = (props: UserProps): JSX.Element => {
  const setUser = useSetAtom(userAtom);
  const logout = () => {
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
