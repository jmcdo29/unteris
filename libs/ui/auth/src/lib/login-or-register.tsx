import Button from '@mui/material/Button';
import { authErrorAtom, displayErrorAtom, isLoggingInAtom } from './auth.atoms';
import { Login } from './login';
import { Register } from './register';
import { useAtom, useAtomValue } from 'jotai';
import { ErrorDisplay } from '@unteris/ui/components';

export const LoginOrRegister = (): JSX.Element => {
  const [isLoggingIn, setIsLoggingIn] = useAtom(isLoggingInAtom);
  const [displayError, setDisplayError] = useAtom(displayErrorAtom);
  const authErrors = useAtomValue(authErrorAtom);
  return (
    <>
      {displayError && (
        <ErrorDisplay
          clearError={setDisplayError}
          errorToDisplay={authErrors}
        />
      )}
      {isLoggingIn ? <Login /> : <Register />}
      <Button onClick={() => setIsLoggingIn(!isLoggingIn)}>
        Switch to {isLoggingIn ? 'register' : 'login'}.
      </Button>
    </>
  );
};
