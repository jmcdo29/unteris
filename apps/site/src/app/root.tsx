import { Box, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { NavBar } from './nav-bar';

export const Root = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const theme = useTheme();
  console.log(children);
  return (
    <>
      <NavBar />
      <Box minHeight="85vh" padding={`${theme.spacing(3)} ${theme.spacing(2)}`}>
        <>
          <Outlet />
          {children ? children : <div />}
        </>
      </Box>
      <Footer />
    </>
  );
};
