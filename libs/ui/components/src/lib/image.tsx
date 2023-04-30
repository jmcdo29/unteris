import Box from '@mui/material/Box';

interface ImageProps {
  src: string;
  alt: string;
  style?: Record<string, string>;
}

export const Image = (props: ImageProps): JSX.Element => {
  return (
    <Box>
      <a href={props.src} target="_blank">
        <img
          src={props.src}
          alt={props.alt}
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '600px',
            objectFit: 'contain',
            padding: '0 1em',
            ...(props.style ?? {}),
          }}
        />
      </a>
    </Box>
  );
};
