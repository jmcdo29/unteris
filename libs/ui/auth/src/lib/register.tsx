import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SignupUser } from '@unteris/shared/types';
import { csrfAtom, userAtom } from '@unteris/ui/atoms';
import { Grid, postFetch } from '@unteris/ui/components';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const newUserAtom = atom<SignupUser>({
  email: '',
  password: '',
  confirmationPassword: '',
  name: '',
});

const matchingPasswordAtom = atom(true);

const errorMessageAtom = atom('');

export const Register = (): JSX.Element => {
  const setUser = useSetAtom(userAtom);
  const [newUser, setNewUser] = useAtom(newUserAtom);
  const [passwordsMatch, setPasswordsMatch] = useAtom(matchingPasswordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const navigate = useNavigate();
  const updateField =
    (field: keyof Pick<SignupUser, 'password' | 'confirmationPassword'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const otherField =
        field === 'password' ? 'confirmationPassword' : 'password';
      setNewUser({ ...newUser, [field]: e.target.value });
      const theyMatch = newUser[field] === newUser[otherField];
      setPasswordsMatch(theyMatch);
      if (!theyMatch) {
        setErrorMessage('Password and Confirmation Password should match');
      } else {
        setErrorMessage('');
      }
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
      confirmationPassword: '',
    });
    navigate('/');
  };
  return (
    <Grid columns={1}>
      <Typography variant="h2" fontSize={'2em'}>
        User Registration
      </Typography>
      <TextField
        value={newUser.email}
        aria-label="email"
        label="Email"
        type="email"
        variant="standard"
        required={true}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <TextField
        value={newUser.name}
        aria-label="Display Name"
        label="Display Name"
        required={true}
        variant="standard"
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <TextField
        value={newUser.password}
        aria-label="password"
        label="Password"
        variant="standard"
        type="password"
        required={true}
        helperText={errorMessage}
        onChange={updateField('password')}
        onBlur={updateField('password')}
      />
      <TextField
        value={newUser.confirmationPassword}
        aria-label="Confirmation Password"
        label="Confirmation Password"
        required={true}
        variant="standard"
        type="password"
        helperText={errorMessage}
        error={!passwordsMatch}
        onChange={updateField('confirmationPassword')}
        onBlur={updateField('confirmationPassword')}
      />
      <Button onClick={submit}>Submit</Button>
    </Grid>
  );
};
