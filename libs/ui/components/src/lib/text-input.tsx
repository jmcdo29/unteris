import Input, { InputProps } from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { UFormControl } from './form-control';

interface TextInputProps {
	value: string;
	type?: InputProps['type'];
	onUpdate: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	label: string;
	required?: boolean;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
	return (
		<UFormControl required={props.required}>
			<InputLabel htmlFor={props.label}>{props.label}</InputLabel>
			<Input
				name={props.label}
				id={props.label}
				value={props.value}
				aria-label={props.label}
				type={props.type ?? 'text'}
				onChange={props.onUpdate}
				onBlur={props.onUpdate}
			/>
		</UFormControl>
	);
};
