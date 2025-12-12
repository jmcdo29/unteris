import Button, { type ButtonProps } from "@mui/material/Button";
import Link, { type LinkProps } from "@mui/material/Link";
import Typography, { type TypographyProps } from "@mui/material/Typography";

const StyledButtonOrLinkInner = ({ children, ...props }: TypographyProps) => (
	<Typography variant="body2" {...props}>
		{children}
	</Typography>
);

export const StyledButton = ({
	children,
	href,
	onClick,
	...props
}: Omit<ButtonProps, keyof TypographyProps> & TypographyProps) => (
	<Button href={href} onClick={onClick}>
		<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
	</Button>
);

export const StyledLink = ({
	children,
	...props
}: LinkProps & TypographyProps) => (
	<Link {...props}>
		<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
	</Link>
);
