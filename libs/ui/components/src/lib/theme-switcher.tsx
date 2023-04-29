import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';

interface ThemeSwitcherProps {
  setTheme: (theme: 'dark' | 'light') => void;
}

export const ThemeSwitcher = ({
  setTheme,
}: ThemeSwitcherProps): JSX.Element => {
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <Grid xs={1} md={1}>
      <Tooltip
        title={`Turn ${isDarkMode ? 'on' : 'off'} the lights`}
        enterDelay={1000}
      >
        <Button onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
      </Tooltip>
    </Grid>
  );
};
