import Button, { type ButtonProps } from "@mui/material/Button";
import Link, { type LinkProps } from "@mui/material/Link";
import Typography, { type TypographyProps } from "@mui/material/Typography";

const StyledButtonOrLinkInner = ({
	children,
	...props
}: TypographyProps): JSX.Element => (
	<Typography variant="body2" {...props}>
		{children}
	</Typography>
);

export const StyledButton = ({
	children,
	href,
	onClick,
	...props
<<<<<<< HEAD
}: Omit<ButtonProps, keyof TypographyProps> & TypographyProps) => (
	<Button href={href} onClick={onClick}>
		<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
	</Button>
);
=======
}: Omit<ButtonProps, keyof TypographyProps> & TypographyProps): JSX.Element => {
	return (
		<Button href={href} onClick={onClick}>
			<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
		</Button>
	);
};
>>>>>>> 6631869 (chore: update code for biome rules)

export const StyledLink = ({
	children,
	...props
<<<<<<< HEAD
}: LinkProps & TypographyProps) => (
	<Link {...props}>
		<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
	</Link>
);
=======
}: LinkProps & TypographyProps): JSX.Element => {
	return (
		<Link {...props}>
			<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
		</Link>
	);
};
>>>>>>> 6631869 (chore: update code for biome rules)
