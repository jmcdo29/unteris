import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@unteris/ui/components';
import { useEffect, useState } from 'react';

interface Deity {
  name: string;
  description: string;
  imageUrl: string;
  domains?: string[];
}

const deities: Record<string, Deity> = {
  Pomdra: {
    description:
      'The Empyrean Being who descended from the clouds and used their power to sew Unteris together as well as planted the Vitoak in the middle. They created the first Celestials to watch over the growth of the Vitoak.',
    imageUrl: '/pomdra.jpg',
    name: 'Pomdra',
  },
  Venlustel: {
    description:
      'The Empyrean who races across the Auroras throughout the Empyrean Sea. They descended down to the Material Plane and placed wisps of light that opened the Material Plane up to others and allowed for faster travel.',
    imageUrl: '/venlustel.png',
    name: 'Venlustel',
  },
  Felvcor: {
    name: 'Felvcor',
    description:
      'The Empyrean who plants the stars. Their Horns are a lustrous and iridescent color that is used to spread out stardust in order to fertilize the path they walk. They descended down to the Material Plane after Venlustel in order to initiate a new growth.',
    imageUrl: '/felvcor.jpg',
  },
  Latubor: {
    name: 'Latubor',
    description:
      'The Empyrean Being who bears Order and Chaos. They flew from the Empyrean Sea down to the Material Plane, endowing the land with their feathers and bringing thoughts to the faceless.',
    imageUrl: '/latubor.jpg',
  },
};

interface DeityProps {
  name: string;
}

export const Deity = (props: DeityProps): JSX.Element => {
  const [deity, setDeity] = useState<Deity>();

  useEffect(() => {
    setTimeout(() => setDeity(deities[props.name]), 500);
  }, [setDeity]);

  if (!deity) {
    return <></>;
  }

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
        <Typography variant="h2">{props.name}</Typography>
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
