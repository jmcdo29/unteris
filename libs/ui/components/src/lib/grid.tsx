import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

export interface GridProps {
  columns?: number;
  rows?: number;
  sx?: SxProps;
  children: ReactNode;
}

export const Grid = ({
  children,
  columns = 12,
  rows = 1,
  sx = {},
}: GridProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
