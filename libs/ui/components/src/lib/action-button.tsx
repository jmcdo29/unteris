import Button from '@mui/material/Button';

interface ActionButtonProps {
  action: () => void;
  text: string;
}

export const ActionButton = (props: ActionButtonProps): JSX.Element => {
  return (
    <Button onClick={props.action} color="secondary" variant="contained">
      {props.text}
    </Button>
  );
};
