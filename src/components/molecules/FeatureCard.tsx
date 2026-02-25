import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SurfaceCard } from '@/components/atoms';

export type Feature = {
  title: string;
  description: string;
  icon: 'fast' | 'design' | 'safe';
};

const iconMap = {
  fast: BoltRoundedIcon,
  design: PaletteRoundedIcon,
  safe: SecurityRoundedIcon,
} satisfies Record<Feature['icon'], typeof BoltRoundedIcon>;

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon];

  return (
    <SurfaceCard sx={{ p: 2.5, height: '100%' }}>
      <Stack spacing={1.5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Icon fontSize="small" />
        </Stack>
        <Typography component="h3" variant="h6">
          {feature.title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {feature.description}
        </Typography>
      </Stack>
    </SurfaceCard>
  );
}
