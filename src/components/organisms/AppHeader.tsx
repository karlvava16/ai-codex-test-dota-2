import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AppButton } from '@/components/atoms';

type AppHeaderProps = {
  currentPage: 'heroes' | 'items';
  onNavigate: (page: 'heroes' | 'items') => void;
};

export function AppHeader({ currentPage, onNavigate }: AppHeaderProps) {
  const navItems = [
    { label: 'Characters', page: 'heroes' },
    { label: 'Stash Items', page: 'items' },
  ] as const;

  return (
    <AppBar
      color="transparent"
      elevation={0}
      position="sticky"
      sx={{
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={1.5}>
            <Box
              aria-hidden
              sx={{
                width: 28,
                height: 28,
                borderRadius: 2,
                background:
                  'linear-gradient(135deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))',
              }}
            />
            <Typography fontWeight={700} variant="subtitle1">
              OpenDota Explorer
            </Typography>
          </Stack>

          <Stack alignItems="center" direction="row" spacing={1}>
            {navItems.map((item) => {
              const active = currentPage === item.page;

              return (
                <AppButton
                  key={item.page}
                  color={active ? 'primary' : 'inherit'}
                  component="a"
                  href={item.page === 'heroes' ? '#heroes' : '#stash-items'}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.page);
                  }}
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                  variant={active ? 'contained' : 'text'}
                >
                  {item.label}
                </AppButton>
              );
            })}
            <IconButton
              aria-label="Open menu"
              color="inherit"
              sx={{ display: { sm: 'none' } }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
