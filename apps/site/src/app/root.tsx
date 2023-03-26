import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { NavBar } from './nav-bar';

interface RootProps {
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Root = ({ setTheme }: RootProps): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <NavBar setTheme={setTheme} />
      <Box minHeight="85vh" padding={`${theme.spacing(3)} ${theme.spacing(2)}`}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
