import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { csrfAtom } from '@unteris/ui/atoms';
import {
  convertUnknownErrorToDisplayError,
  Grid,
  postFetch,
  TextInput,
} from '@unteris/ui/components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { authErrorAtom, displayErrorAtom, authUserAtom } from './auth.atoms';

export const ForgotPassword = (): JSX.Element => {
  const [loginUser, setLoginUser] = useAtom(authUserAtom);
  const csrfToken = useAtomValue(csrfAtom);
  const setAuthError = useSetAtom(authErrorAtom);
  const setDisplayError = useSetAtom(displayErrorAtom);
  const sendResetRequest = async () => {
    try {
      const res = await postFetch({
        endpoint: 'auth/reset-password',
        body: {
          email: loginUser.email,
        },
        csrfToken,
      });
    } catch (e) {
      setAuthError(
        convertUnknownErrorToDisplayError(e, 'Reset Password Error')
      );
      setDisplayError(true);
    }
  };
  return (
    <Grid columns={1}>
      <Typography variant="h2" fontSize={'2em'}>
        Forgot Password?
      </Typography>
      <TextInput
        value={loginUser.email}
        aria-label="email"
        label="Email"
        type="email"
        required={true}
        onUpdate={(e) =>
          setLoginUser({ password: '', email: e.target.value, name: '' })
        }
      />
      <Button onClick={sendResetRequest} color="secondary" variant="contained">
        Reset Password
      </Button>
    </Grid>
  );
};
