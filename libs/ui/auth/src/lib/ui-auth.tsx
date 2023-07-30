import { useTheme } from '@mui/material';
import { userAtom } from '@unteris/ui/atoms';
import { Grid } from '@unteris/ui/components';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { LoginOrRegister } from './login-or-register';

export function UiAuth() {
  const theme = useTheme();
  const user = useAtomValue(userAtom);
  const nav = useNavigate();
  if (user.id) {
    nav('/me');
    return <div />;
  }
  return (
    <Grid columns={1} sx={{ justifyItems: 'center', rowGap: theme.spacing(2) }}>
      <LoginOrRegister />
    </Grid>
  );
}

export default UiAuth;
