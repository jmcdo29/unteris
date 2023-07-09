import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SignupUser } from '@unteris/shared/types';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import {
  Grid,
  PasswordInput,
  postFetch,
  TextInput,
} from '@unteris/ui/components';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const newUserAtom = atom<SignupUser>({
  email: '',
  password: '',
  name: '',
});

export const Register = (): JSX.Element => {
  const setUser = useSetAtom(userAtom);
  const [newUser, setNewUser] = useAtom(newUserAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const navigate = useNavigate();
  const updateField =
    (field: keyof SignupUser) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewUser({ ...newUser, [field]: e.target.value });
    };
  const submit = async () => {
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
