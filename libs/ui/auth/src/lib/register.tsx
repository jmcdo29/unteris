import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SignupUser } from '@unteris/shared/types';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import {
  convertUnknownErrorToDisplayError,
  Grid,
  PasswordInput,
  postFetch,
  TextInput,
} from '@unteris/ui/components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authErrorAtom, displayErrorAtom, authUserAtom } from './auth.atoms';

export const Register = (): JSX.Element => {
  const setUser = useSetAtom(userAtom);
  const setAuthError = useSetAtom(authErrorAtom);
  const setDisplayError = useSetAtom(displayErrorAtom);
  const [newUser, setNewUser] = useAtom(authUserAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const navigate = useNavigate();
  const updateField =
    (field: keyof SignupUser) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewUser({ ...newUser, [field]: e.target.value });
    };
  const submit = async () => {
    try {
      const res = await postFetch<{ id: string }>({
        csrfToken,
        endpoint: 'auth/signup',
        body: newUser,
      });
      setUser({
        id: res.id,
        email: newUser.email,
        displayName: newUser.name,
      });
      setNewUser({
        email: '',
        password: '',
        name: '',
      });
      navigate('/');
    } catch (e) {
      setAuthError(convertUnknownErrorToDisplayError(e, 'Registration Error'));
      setDisplayError(true);
    }
  };
  return (
    <Grid columns={1}>
      <Typography variant="h2" fontSize={'2em'}>
        User Registration
      </Typography>
      <TextInput
        value={newUser.email}
        label="Email"
        type="email"
        required={true}
        onUpdate={updateField('email')}
      />
      <TextInput
        value={newUser.name}
        label="Display Name"
        required={true}
        onUpdate={updateField('name')}
      />
      <PasswordInput
        value={newUser.password}
        onUpdate={updateField('password')}
        isSignup={true}
      />
      <Button onClick={submit} color="secondary" variant="contained">
        Register
      </Button>
    </Grid>
  );
};
