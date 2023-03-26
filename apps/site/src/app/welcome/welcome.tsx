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
      padding={`${theme.spacing()} ${theme.spacing(2)}`}
      border={`2px solid ${theme.palette.primary[theme.palette.mode]}`}
      borderRadius={theme.shape.borderRadius}
      margin={`0 ${theme.spacing(4)}`}
      minWidth={theme.spacing(50)}
    >
      {children}
    </Box>
  );
};

export const Welcome = (): JSX.Element => {
  const theme = useTheme();
  const opacityMod = theme.palette.mode === 'dark' ? '88' : '8';
  return (
    <Box padding={`${theme.spacing(5)} 0`}>
      <Grid sx={{ justifyItems: 'center', height: '40%' }}>
        <Grid
          sx={{
            justifyItems: 'center',
            width: '100%',
            borderRadius: theme.shape.borderRadius,
            background: ` linear-gradient(to right, ${
              theme.palette.secondary[theme.palette.mode]
            }, ${
              theme.palette.background.default
            }${opacityMod}), url(./vitoak.png)`,
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'left, right top 40%',
            columnGap: theme.spacing(),
            padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
            margin: `0 0 ${theme.spacing(2)}`,
          }}
          columns={6}
        >
          <Typography
            variant="h2"
            sx={{
              gridColumn: '1 / 3',
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
        </Grid>
      </Grid>
      <Grid
        sx={{
          columnGap: theme.spacing(),
          justifyItems: 'center',
          justifyContent: 'center',
        }}
      >
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
    </Box>
  );
};
