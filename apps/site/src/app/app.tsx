import { forwardRef, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { LinkProps } from '@mui/material/Link';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  RouterProvider,
} from 'react-router-dom';

import { router } from './router';

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [chosenTheme, setChosenTheme] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );
  const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
  >((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  });
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: chosenTheme,
          primary: {
            main: '#63ad58',
          },
          secondary: {
            main: '#a337bc',
          },
        },
        typography: {
          h2: {
            fontFamily: 'Cinzel Decorative',
          },
          body2: {
            fontFamily: 'Cinzel Decorative',
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehavior,
            },
          },
        },
      }),
    [prefersDarkMode, chosenTheme, LinkBehavior]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router(setChosenTheme)} />
    </ThemeProvider>
  );
}

export default App;
