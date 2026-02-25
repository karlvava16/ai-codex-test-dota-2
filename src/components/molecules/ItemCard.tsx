import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SurfaceCard } from '@/components/atoms';
import type { OpenDotaItem } from '@/services/opendota/types';
import { getOpenDotaAssetUrl } from '@/services/opendota/utils';

type ItemCardProps = {
  item: OpenDotaItem;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <SurfaceCard sx={{ p: 2, height: '100%' }}>
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            alt={item.displayName}
            src={item.img ? getOpenDotaAssetUrl(item.img) : undefined}
            variant="rounded"
            sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: 'background.default' }}
          />
          <Stack spacing={0.25} minWidth={0}>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {item.displayName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Cost: {item.cost ?? 0}
              {item.qual ? ` • ${item.qual}` : ''}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
          {item.shopTags.slice(0, 4).map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
          {item.tier ? <Chip label={`Tier ${item.tier}`} size="small" color="secondary" /> : null}
        </Stack>
      </Stack>
    </SurfaceCard>
  );
}
