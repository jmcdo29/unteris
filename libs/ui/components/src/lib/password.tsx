import CapsLockIcon from '@mui/icons-material/KeyboardCapslock';
import NumLockIcon from '@mui/icons-material/Numbers';
import Show from '@mui/icons-material/Visibility';
import DoNotShow from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';
import { UFormControl } from './form-control';

const capsLockAtom = atom(false);
const numLockAtom = atom(false);

interface PasswordProps {
	onUpdate: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	placeholder?: string;
	label?: string;
	value: string;
	isSignup: boolean;
}

export const PasswordInput = (props: PasswordProps): JSX.Element => {
	const theme = useTheme();
	const showPasswordAtom = useMemo(() => atom(false), []);
	const [capsLockActive, setCapsLockActive] = useAtom(capsLockAtom);
	const [numLockActive, setNumLockActive] = useAtom(numLockAtom);
	const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const label = props.label ?? 'Password';
	const toggleLockKeys = (
		e: React.KeyboardEvent,
		key: 'CapsLock' | 'NumLock',
		currVal: boolean,
		setVal: (val: boolean) => void,
	) => {
		if (e.getModifierState(key) && e.key !== key) {
			setVal(true);
		} else if (e.getModifierState(key) && e.key === key) {
			setVal(!currVal);
		}
	};
	const passwordInput = (e: React.KeyboardEvent) => {
		toggleLockKeys(e, 'CapsLock', capsLockActive, setCapsLockActive);
		toggleLockKeys(e, 'NumLock', numLockActive, setNumLockActive);
	};
	return (
		<UFormControl required>
			<InputLabel htmlFor={label}>{label}</InputLabel>
			<Input
				name={label}
				id={label}
				value={props.value}
				aria-label={label}
				type={showPassword ? 'text' : 'password'}
				onChange={props.onUpdate}
				onBlur={props.onUpdate}
				onKeyDown={passwordInput}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							onClick={toggleShowPassword}
							edge='end'
						>
							{showPassword ? <DoNotShow /> : <Show />}
						</IconButton>
					</InputAdornment>
				}
			/>
			{props.isSignup && props.value.length < 12 && (
				<FormHelperText id={label} sx={{ color: theme.palette.text.disabled }}>
					* Must be at least 12 characters long
				</FormHelperText>
			)}
			{capsLockActive && (
				<FormHelperText id={label} sx={{ color: theme.palette.text.disabled }}>
					<CapsLockIcon /> Caps lock is active
				</FormHelperText>
			)}
			{numLockActive && (
				<FormHelperText id={label} sx={{ color: theme.palette.text.disabled }}>
					<NumLockIcon /> Num lock is active
				</FormHelperText>
			)}
		</UFormControl>
	);
};
