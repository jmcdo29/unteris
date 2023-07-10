import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { Grid } from './grid';
interface ErrorDisplayProps {
  clearError: (val: boolean) => void;
  errorToDisplay: any;
}

export const ErrorDisplay = (props: ErrorDisplayProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid>
      <Box
        borderColor={theme.palette.error.main}
        bgcolor={theme.palette.error.light}
      >
        {props.errorToDisplay}
      </Box>
    </Grid>
  );
};
