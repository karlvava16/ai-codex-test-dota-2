import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';

type InlineCodeProps = PropsWithChildren;

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <Box
      component="code"
      sx={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        px: 0.5,
        py: 0.125,
        borderRadius: 1,
        bgcolor: 'rgba(15, 76, 92, 0.08)',
      }}
    >
      {children}
    </Box>
  );
}
