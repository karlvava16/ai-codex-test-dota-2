import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDeferredValue, useMemo, useState } from 'react';

import { AppTextField, SurfaceCard } from '@/components/atoms';
import { ItemCard } from '@/components/molecules';
import { useOpenDotaItems } from '@/hooks/useOpenDotaItems';

export function ItemsPage() {
  const { data: items, loading, error } = useOpenDotaItems();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [costBand, setCostBand] = useState<'all' | 'cheap' | 'mid' | 'expensive'>('all');

  const deferredSearch = useDeferredValue(search);

  const tagOptions = useMemo(() => {
    const tags = new Set<string>();
    for (const item of items) {
      for (const tag of item.shopTags) {
        tags.add(tag);
      }
    }

    return ['all', ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return items.filter((item) => {
      if (
        normalizedSearch &&
        !item.displayName.toLowerCase().includes(normalizedSearch) &&
        !item.key.toLowerCase().includes(normalizedSearch)
      ) {
        return false;
      }

      if (selectedTag !== 'all' && !item.shopTags.includes(selectedTag)) {
        return false;
      }

      const cost = item.cost ?? 0;
      if (costBand === 'cheap' && cost > 1000) {
        return false;
      }
      if (costBand === 'mid' && (cost < 1001 || cost > 3000)) {
        return false;
      }
      if (costBand === 'expensive' && cost < 3001) {
        return false;
      }

      return true;
    });
  }, [costBand, deferredSearch, items, selectedTag]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography component="h1" variant="h4" fontWeight={700}>
            Stash Items
          </Typography>
          <Typography color="text.secondary">
            Data source: OpenDota API (31.1.0) `constants/items` endpoint. Filter by item name,
            shop tag, and cost band.
          </Typography>
        </Stack>

        <SurfaceCard sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FilterListRoundedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>
                Filters
              </Typography>
            </Stack>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 5 }}>
                <AppTextField
                  fullWidth
                  label="Search item"
                  placeholder="Blink, Black King Bar..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="item-tag-filter-label">Shop tag</InputLabel>
                  <Select
                    label="Shop tag"
                    labelId="item-tag-filter-label"
                    value={selectedTag}
                    onChange={(event) => setSelectedTag(event.target.value)}
                  >
                    {tagOptions.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag === 'all' ? 'All tags' : tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="item-cost-filter-label">Cost band</InputLabel>
                  <Select
                    label="Cost band"
                    labelId="item-cost-filter-label"
                    value={costBand}
                    onChange={(event) =>
                      setCostBand(event.target.value as 'all' | 'cheap' | 'mid' | 'expensive')
                    }
                  >
                    <MenuItem value="all">All costs</MenuItem>
                    <MenuItem value="cheap">Cheap (0-1000)</MenuItem>
                    <MenuItem value="mid">Mid (1001-3000)</MenuItem>
                    <MenuItem value="expensive">Expensive (3001+)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </SurfaceCard>

        <Typography color="text.secondary" variant="body2">
          Showing {filteredItems.length} of {items.length} items
        </Typography>

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        {!loading && !error ? (
          <Grid container spacing={2}>
            {filteredItems.map((item) => (
              <Grid key={item.key} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : null}

        {!loading && !error && filteredItems.length === 0 ? (
          <Alert severity="info">No items match the current filters.</Alert>
        ) : null}
      </Stack>
    </Container>
  );
}
