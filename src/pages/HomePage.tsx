import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AppButton, InlineCode, SurfaceCard } from '@/components/atoms';
import { FeatureCard } from '@/components/molecules';
import type { Feature } from '@/components/molecules';

const features: Feature[] = [
  {
    title: 'Typed by default',
    description: 'TypeScript strict mode helps catch errors early and keeps refactors safer.',
    icon: 'safe',
  },
  {
    title: 'MUI-first design system',
    description: 'Custom theme, CssBaseline, and reusable components give you a scalable UI foundation.',
    icon: 'design',
  },
  {
    title: 'Fast local iteration',
    description: 'Vite keeps startup and HMR snappy for day-to-day development.',
    icon: 'fast',
  },
];

export function HomePage() {
  return (
    <Box
      sx={{
        background:
          'radial-gradient(circle at 20% 0%, rgba(15,76,92,0.12), transparent 40%), radial-gradient(circle at 90% 10%, rgba(227,100,20,0.10), transparent 35%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={6}>
          <Stack spacing={3} sx={{ maxWidth: 760 }}>
            <Chip label="OpenDota Explorer" color="secondary" sx={{ alignSelf: 'flex-start' }} />
            <Typography
              component="h1"
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.1 }}
            >
              Browse Dota heroes and items with filterable pages
            </Typography>
            <Typography color="text.secondary" variant="h6" sx={{ maxWidth: 680, fontWeight: 400 }}>
              This starter now includes separate pages for heroes and items, powered by the
              OpenDota API, with client-side filtering and a reusable MUI component structure.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <AppButton
                component="a"
                href="#heroes"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Browse Heroes
              </AppButton>
              <AppButton component="a" href="#stash-items" variant="outlined" size="large">
                Browse Items
              </AppButton>
            </Stack>
          </Stack>

          <SurfaceCard sx={{ p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}>
              {features.map((feature) => (
                <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
                  <FeatureCard feature={feature} />
                </Grid>
              ))}
            </Grid>
          </SurfaceCard>

          <Typography color="text.secondary" variant="body2">
            Tip: Start by editing <InlineCode>src/pages/HeroesPage.tsx</InlineCode> and{' '}
            <InlineCode>src/pages/ItemsPage.tsx</InlineCode>.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
