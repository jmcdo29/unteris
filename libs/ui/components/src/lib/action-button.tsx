import Button from '@mui/material/Button';

interface ActionButtonProps {
	action: () => void;
	text: string;
	disabled?: boolean;
}

export const ActionButton = (props: ActionButtonProps): JSX.Element => {
	return (
		<Button
			onClick={props.action}
			color="secondary"
			variant="contained"
			disabled={props.disabled}
		>
			{props.text}
		</Button>
	);
};
