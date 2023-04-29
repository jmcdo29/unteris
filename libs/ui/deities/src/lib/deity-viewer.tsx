import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import Button from '@mui/material/Button';
// import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Deity } from './deity.interface';

interface DeityViewerProps {
  deity: Deity;
  setIsEditing: (isEditing: boolean) => void;
}

export const DeityViewer = ({
  deity,
}: // setIsEditing,
DeityViewerProps): JSX.Element => {
  return (
    <Grid container={true}>
      <Grid container={true} direction="column" xs={12} md={6}>
        <Grid alignSelf="center">
          <Typography variant="h2" fontSize="3.25rem">
            {deity.name}

            {/*<Button onClick={() => setIsEditing(true)}>
              <EditIcon />
            </Button>*/}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="body1">{deity.description}</Typography>
        </Grid>
        <Grid>
          {deity.domains?.length ? (
            <Typography variant="body1">
              Domains: {deity.domains?.join(', ')}
            </Typography>
          ) : (
            <Box />
          )}
        </Grid>
        <Box />
      </Grid>
      <Grid md={6} xs={12}>
        <Box>
          <img
            src={deity.imageUrl}
            alt={`${deity.name}`}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '600px',
              objectFit: 'contain',
              padding: '0 1em',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
