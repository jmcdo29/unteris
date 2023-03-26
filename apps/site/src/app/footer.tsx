import { Box, Divider, Typography, useTheme } from '@mui/material';
import Heart from '@mui/icons-material/Favorite';
import { Grid, StyledLink } from '@unteris/ui/components';

export const Footer = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Divider />
      <Grid
        columns={1}
        sx={{ justifyContent: 'center', justifyItems: 'center' }}
      >
        <Typography variant="body1">
          Made with <Heart color="primary" display="inline-block" /> by&nbsp;
          <StyledLink href="https://github.com/jmcdo29" display="inline">
            Jay McDoniel
          </StyledLink>
        </Typography>
      </Grid>
    </Box>
  );
};
