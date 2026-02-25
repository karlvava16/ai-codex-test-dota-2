import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';

import { AppHeader } from '@/components/organisms';

type ShellLayoutProps = PropsWithChildren<{
  currentPage: 'heroes' | 'items';
  onNavigate: (page: 'heroes' | 'items') => void;
}>;

export function ShellLayout({ children, currentPage, onNavigate }: ShellLayoutProps) {
  return (
    <Box sx={{ minHeight: '100dvh' }}>
      <AppHeader currentPage={currentPage} onNavigate={onNavigate} />
      <Box component="main" sx={{ py: 2 }}>
        {children}
      </Box>
    </Box>
  );
}
