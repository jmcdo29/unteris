import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Grid } from '@unteris/ui/components';
import { Deity } from './deity.interface';

interface DeityViewerProps {
  deity: Deity;
  setIsEditing: (isEditing: boolean) => void;
}

export const DeityViewer = ({
  deity,
  setIsEditing,
}: DeityViewerProps): JSX.Element => {
  return (
    <Grid columns={12}>
      <Box
        sx={{
          gridColumn: 'span 4',
          paddingLeft: '1em',
          display: 'grid',
          gridColumnTemplate: 'fr',
        }}
      >
        <Box>
          <Typography variant="h2" fontSize="3.25rem">
            {deity.name}

            <Button onClick={() => setIsEditing(true)}>
              <EditIcon />
            </Button>
          </Typography>
        </Box>
        <Typography variant="body1">{deity.description}</Typography>
        {deity.domains?.length ? (
          <Typography variant="body1">
            Domains: {deity.domains?.join(', ')}
          </Typography>
        ) : (
          <Box />
        )}
        <Box />
      </Box>
      <Box sx={{ gridColumn: 'span 8', maxHeight: '75vh', maxWidth: '100%' }}>
        <img
          src={deity.imageUrl}
          alt={`${deity.name} image`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    </Grid>
  );
};
