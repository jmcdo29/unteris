import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import X from '@mui/icons-material/Cancel';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { Grid } from './grid';

export interface DisplayError {
  title: string;
  messages: string[];
}

interface ErrorDisplayProps {
  clearError: (val: boolean) => void;
  errorToDisplay?: DisplayError;
}

export const ErrorDisplay = (props: ErrorDisplayProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid>
      {props.errorToDisplay ? (
        <Box
          borderColor={theme.palette.error.dark}
          bgcolor={theme.palette.error.main}
          borderRadius={theme.shape.borderRadius}
          padding={theme.spacing(1)}
        >
          <Box>
            <Typography variant="h2" fontSize="2em">
              {props.errorToDisplay.title}
            </Typography>
          </Box>
          <List>
            {props.errorToDisplay.messages.map((message, index) => (
              <ListItemText primary={message} key={index} />
            ))}
          </List>
          <IconButton onClick={() => props.clearError(false)}>
            <X />
          </IconButton>
        </Box>
      ) : (
        <Box />
      )}
    </Grid>
  );
};
