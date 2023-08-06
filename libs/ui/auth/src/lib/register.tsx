import { SignupUser } from '@unteris/shared/types';
import { userAtom } from '@unteris/ui/atoms';
import {
  ActionButton,
  convertUnknownErrorToDisplayError,
  Heading,
  PasswordInput,
  sdk,
  TextInput,
} from '@unteris/ui/components';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authErrorAtom, displayErrorAtom, authUserAtom } from './auth.atoms';

export const Register = (): JSX.Element => {
  const setUser = useSetAtom(userAtom);
  const setAuthError = useSetAtom(authErrorAtom);
  const setDisplayError = useSetAtom(displayErrorAtom);
  const [newUser, setNewUser] = useAtom(authUserAtom);
  const navigate = useNavigate();
  const updateField =
    (field: keyof SignupUser) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewUser({ ...newUser, [field]: e.target.value });
    };
  const submit = async () => {
    try {
      const res = await sdk.signup(newUser);
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
    <>
      <Heading text="Register" />
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
      <ActionButton action={submit} text="Register" />
    </>
  );
};
