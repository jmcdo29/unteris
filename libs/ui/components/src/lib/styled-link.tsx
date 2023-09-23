import Button, { ButtonProps } from "@mui/material/Button";
import Link, { LinkProps } from "@mui/material/Link";
import Typography, { TypographyProps } from "@mui/material/Typography";

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
}: Omit<ButtonProps, keyof TypographyProps> & TypographyProps) => {
	return (
		<Button href={href} onClick={onClick}>
			<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
		</Button>
	);
};

export const StyledLink = ({
	children,
	...props
}: LinkProps & TypographyProps) => {
	return (
		<Link {...props}>
			<StyledButtonOrLinkInner {...props}>{children}</StyledButtonOrLinkInner>
		</Link>
	);
};
