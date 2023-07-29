import { LoginResponse } from '@unteris/shared/types';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import {
  ActionButton,
  convertUnknownErrorToDisplayError,
  Heading,
  PasswordInput,
  postFetch,
  TextInput,
} from '@unteris/ui/components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authErrorAtom, displayErrorAtom, authUserAtom } from './auth.atoms';

export const Login = (): JSX.Element => {
  const [loginUser, setLoginUser] = useAtom(authUserAtom);
  const setAuthError = useSetAtom(authErrorAtom);
  const setDisplayError = useSetAtom(displayErrorAtom);
  const setUser = useSetAtom(userAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await postFetch<LoginResponse>({
        endpoint: 'auth/login',
        body: {
          email: loginUser.email,
          password: loginUser.password,
        },
        csrfToken,
      });
      setUser({
        id: res.id,
        email: loginUser.email,
        displayName: res.displayName,
      });
      setLoginUser({ email: '', password: '', name: '' });
      navigate('/');
    } catch (e) {
      setAuthError(convertUnknownErrorToDisplayError(e, 'Sign In Error'));
      setDisplayError(true);
    }
  };
  return (
    <>
      <Heading text="Login" />
      <TextInput
        value={loginUser.email}
        aria-label="email"
        label="Email"
        type="email"
        required={true}
        onUpdate={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
      />
      <PasswordInput
        value={loginUser.password}
        aria-label="password"
        label="Password"
        isSignup={false}
        onUpdate={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
      />
      <ActionButton action={login} text="Log In" />
    </>
  );
};
