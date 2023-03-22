import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, ThemeSwitcher } from '@unteris/ui/components';
import { useState } from 'react';

export const NavBar = (props: {
  setTheme: (theme: 'dark' | 'light') => void;
}): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Grid columns={12}>
        <Box>
          <Button onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </Button>
        </Box>
        <Box sx={{ gridColumn: 'span 9' }}></Box>
        <ThemeSwitcher setTheme={props.setTheme} />
        <Box>
          <Button>
            <ProfileIcon />
          </Button>
        </Box>
      </Grid>
      <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
        <Box>Drawer is showing</Box>
      </Drawer>
    </>
  );
};
