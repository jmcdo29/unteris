import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Unstable_Grid2';
import { StyledButton, ThemeSwitcher } from '@unteris/ui/components';
import { useState } from 'react';

export const NavBar = (props: {
  setTheme: (theme: 'dark' | 'light') => void;
}): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Grid container={true} columns={{ xs: 4, md: 12 }}>
        <Grid md={1}>
          <Button onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </Button>
        </Grid>
        <Grid md={1}>
          <StyledButton href="/" variant="h2" fontSize="2em">
            Unteris
          </StyledButton>
        </Grid>
        <Grid xs={0} md={8}></Grid>
        <ThemeSwitcher setTheme={props.setTheme} />
        <Grid md={1}>
          <Button>
            <ProfileIcon />
          </Button>
        </Grid>
      </Grid>
      <Drawer
        open={showMenu}
        onClose={() => setShowMenu(false)}
        sx={{ alignItems: 'start' }}
      >
        <StyledButton href="/" onClick={() => setShowMenu(false)}>
          Home
        </StyledButton>
        <StyledButton href="/history" onClick={() => setShowMenu(false)}>
          History
        </StyledButton>
        <StyledButton href="/deities" onClick={() => setShowMenu(false)}>
          Deities
        </StyledButton>
      </Drawer>
    </>
  );
};
