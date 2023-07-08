interface UserProps {
  user: {
    displayName: string;
  };
}

export const User = (props: UserProps): JSX.Element => {
  return <div>{props.user.displayName}</div>;
};
