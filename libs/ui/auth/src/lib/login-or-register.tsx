import Button from '@mui/material/Button';
import { isLoggingInAtom } from './auth.atoms';
import { Login } from './login';
import { Register } from './register';
import { useAtom } from 'jotai';

export const LoginOrRegister = (): JSX.Element => {
  const [isLoggingIn, setIsLoggingIn] = useAtom(isLoggingInAtom);
  return (
    <>
      {isLoggingIn ? <Login /> : <Register />}
      <Button onClick={() => setIsLoggingIn(!isLoggingIn)}>
        Switch to {isLoggingIn ? 'register' : 'login'}.
      </Button>
    </>
  );
};
