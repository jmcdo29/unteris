import { Theme, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@unteris/ui/components';
import { ReactNode } from 'react';

const Descriptor = ({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}): JSX.Element => {
  return (
    <Box
      sx={{ gridColumn: 'span 2' }}
      padding={`${theme.spacing()} ${theme.spacing(2)}`}
      border={`2px solid ${theme.palette.primary[theme.palette.mode]}`}
      borderRadius={theme.shape.borderRadius}
    >
      {children}
    </Box>
  );
};

export const Welcome = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid sx={{ justifyItems: 'center', height: '40%', marginTop: '1em' }}>
      <Grid
        sx={{
          gridColumn: '2 / -2',
          justifyItems: 'center',
          width: '100%',
          borderRadius: '15px',
          background: `linear-gradient(to right, ${
            theme.palette.secondary[theme.palette.mode]
          }, ${theme.palette.background.default})`,
          padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
          rowGap: theme.spacing(2),
          columnGap: theme.spacing(),
        }}
        columns={6}
      >
        <Typography
          variant="h2"
          sx={{
            gridColumn: '1 / 3',
            // fontFamily: 'Cinzel Decorative',
          }}
          component="h1"
        >
          Welcome to Unteris
        </Typography>
        <Box
          sx={{
            gridColumn: '3/-1',
          }}
        ></Box>
        <Descriptor theme={theme}>
          Enter a land once torn apart by war and bloodshed, sewn back together
          with magic
        </Descriptor>
        <Descriptor theme={theme}>
          Face cultist, meet Gods, and fight for your life against unknown
          threats
        </Descriptor>
        <Descriptor theme={theme}>
          Forge a part of the legend that the land will tell in time
        </Descriptor>
      </Grid>
    </Grid>
  );
};
