import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import { themeAtom } from '@unteris/ui/atoms';
import { useAtom } from 'jotai';

export const ThemeSwitcher = (): JSX.Element => {
	const [currentTheme, setTheme] = useAtom(themeAtom);

	const isDarkMode = currentTheme === 'dark';
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
