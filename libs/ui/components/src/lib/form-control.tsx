import { FormControl } from '@mui/material';

interface UFormControlProps {
  required?: boolean;
}

export const UFormControl = (
  props: React.PropsWithChildren<UFormControlProps>
): JSX.Element => (
  <FormControl required={props.required} sx={{ margin: '0.5em 0' }}>
    {props.children}
  </FormControl>
);
