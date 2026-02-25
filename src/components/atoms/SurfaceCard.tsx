import Paper from '@mui/material/Paper';
import type { PaperProps } from '@mui/material/Paper';

export function SurfaceCard({ sx, elevation = 0, ...props }: PaperProps) {
  return (
    <Paper
      elevation={elevation}
      sx={[
        {
          border: '1px solid',
          borderColor: 'divider',
          backgroundImage: 'none',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}
