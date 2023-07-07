import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { NavBar } from './nav-bar';

export const Root = (): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <NavBar />
      <Box minHeight="85vh" padding={`${theme.spacing(3)} ${theme.spacing(2)}`}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
