import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

export interface GridProps {
  columns?: number;
  rows?: string;
  sx?: SxProps;
  children: ReactNode;
}

export const Grid = ({
  children,
  columns,
  rows = 'auto',
  sx = {},
}: GridProps): JSX.Element => {
  if (!children) {
    throw new Error('Grid should be used with children');
  }
  if (Array.isArray(children) && !columns) {
    columns = children.length;
  }
  if (typeof children === 'object' && !columns) {
    columns = 1;
  }
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns ?? 12}, 1fr)`,
        gridTemplateRows: rows,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
