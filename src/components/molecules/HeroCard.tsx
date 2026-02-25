import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SurfaceCard } from '@/components/atoms';
import type { OpenDotaHero } from '@/services/opendota/types';
import { getOpenDotaAssetUrl } from '@/services/opendota/utils';

type HeroCardProps = {
  hero: OpenDotaHero;
};

function formatPrimaryAttr(attr: OpenDotaHero['primary_attr']) {
  switch (attr) {
    case 'agi':
      return 'Agility';
    case 'str':
      return 'Strength';
    case 'int':
      return 'Intelligence';
    case 'all':
      return 'Universal';
    default:
      return attr;
  }
}

export function HeroCard({ hero }: HeroCardProps) {
  return (
    <SurfaceCard sx={{ p: 2, height: '100%' }}>
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            alt={hero.localized_name}
            src={getOpenDotaAssetUrl(hero.icon)}
            variant="rounded"
            sx={{ width: 56, height: 56, borderRadius: 2 }}
          />
          <Stack spacing={0.25} minWidth={0}>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {hero.localized_name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {formatPrimaryAttr(hero.primary_attr)} • {hero.attack_type}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
          {hero.roles.map((role) => (
            <Chip key={role} label={role} size="small" variant="outlined" />
          ))}
        </Stack>
      </Stack>
    </SurfaceCard>
  );
}
