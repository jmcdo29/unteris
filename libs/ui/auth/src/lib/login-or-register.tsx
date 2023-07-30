import Button from '@mui/material/Button';
import {
  authErrorAtom,
  displayErrorAtom,
  forgotPasswordAtom,
  isLoggingInAtom,
} from './auth.atoms';
import { Login } from './login';
import { Register } from './register';
import { useAtom, useAtomValue } from 'jotai';
import { ErrorDisplay, Grid } from '@unteris/ui/components';
import { ForgotPassword } from './forgot-password';

export const LoginOrRegister = (): JSX.Element => {
  const [isLoggingIn, setIsLoggingIn] = useAtom(isLoggingInAtom);
  const [displayError, setDisplayError] = useAtom(displayErrorAtom);
  const [forgotPassword, setForgotPassword] = useAtom(forgotPasswordAtom);
  const authErrors = useAtomValue(authErrorAtom);
  return (
    <>
      {displayError && (
        <ErrorDisplay
          clearError={setDisplayError}
          errorToDisplay={authErrors}
        />
      )}
      <Grid columns={1}>
        {forgotPassword ? (
          <ForgotPassword />
        ) : isLoggingIn ? (
          <Login />
        ) : (
          <Register />
        )}
      </Grid>
      <Button onClick={() => setIsLoggingIn(!isLoggingIn)}>
        Switch to {isLoggingIn ? 'register' : 'login'}.
      </Button>
      <Button onClick={() => setForgotPassword(!forgotPassword)}>
        {!forgotPassword
          ? 'Forgot password?'
          : `Back to ${isLoggingIn ? 'login' : 'register'}.`}
      </Button>
    </>
  );
};
