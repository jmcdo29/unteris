import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { Grid } from '@unteris/ui/components';
import { useAtom } from 'jotai';
import { Login } from './login';
import { isLoggingInAtom } from './login-or-register.atom';
import { Register } from './register';

export function UiAuth() {
  const theme = useTheme();
  const [isLoggingIn, setIsLoggingIn] = useAtom(isLoggingInAtom);
  return (
    <Grid columns={1} sx={{ justifyItems: 'center', rowGap: theme.spacing(2) }}>
      {/*<h1>Welcome to UiAuth!</h1>*/}
      {isLoggingIn ? <Login /> : <Register />}
      <Button onClick={() => setIsLoggingIn(!isLoggingIn)}>
        Switch to {isLoggingIn ? 'register' : 'login'}.
      </Button>
    </Grid>
  );
}

export default UiAuth;
