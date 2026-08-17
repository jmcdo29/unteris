import { FormControl } from "@mui/material";

interface UFormControlProps {
	required?: boolean;
	fullWidth?: boolean;
}

export const UFormControl = (
	props: React.PropsWithChildren<UFormControlProps>,
): JSX.Element => (
	<FormControl
		required={props.required}
		sx={{ margin: "0.5em 0" }}
		fullWidth={props.fullWidth}
	>
		{props.children}
	</FormControl>
);
