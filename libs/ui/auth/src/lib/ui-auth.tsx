import { useTheme } from '@mui/material';
import { userAtom } from '@unteris/ui/atoms';
import { Grid } from '@unteris/ui/components';
import { useAtomValue } from 'jotai';
import { LoginOrRegister } from './login-or-register';
import { User } from './user';

export function UiAuth() {
  const theme = useTheme();
  const user = useAtomValue(userAtom);
  return (
    <Grid columns={1} sx={{ justifyItems: 'center', rowGap: theme.spacing(2) }}>
      {user.id ? <User user={user} /> : <LoginOrRegister />}
    </Grid>
  );
}

export default UiAuth;
