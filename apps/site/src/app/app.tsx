import { useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import { NavBar } from './nav-bar';
import { Welcome } from './welcome/welcome';

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [chosenTheme, setChosenTheme] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );
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
        },
      }),
    [prefersDarkMode, chosenTheme]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar setTheme={setChosenTheme} />
      <Welcome />
    </ThemeProvider>
  );
}

export default App;
