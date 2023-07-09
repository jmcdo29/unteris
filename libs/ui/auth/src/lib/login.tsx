import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LoginBody, LoginResponse } from '@unteris/shared/types';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import {
  Grid,
  PasswordInput,
  postFetch,
  TextInput,
} from '@unteris/ui/components';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const loginUserAtom = atom<LoginBody>({ email: '', password: '' });

export const Login = (): JSX.Element => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const setUser = useSetAtom(userAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const navigate = useNavigate();

  const login = async () => {
    const res = await postFetch<LoginResponse>({
      endpoint: 'auth/login',
      body: loginUser,
      csrfToken,
    });
    setUser({
      id: res.id,
      email: loginUser.email,
      displayName: res.displayName,
    });
    setLoginUser({ email: '', password: '' });
    navigate('/');
  };
  return (
    <Grid columns={1}>
      <Typography variant="h2" fontSize={'2em'}>
        User Login
      </Typography>
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
      <Button onClick={login} color="secondary" variant="contained">
        Log In
      </Button>
    </Grid>
  );
};
