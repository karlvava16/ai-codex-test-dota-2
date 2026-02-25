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
import { HeroCard } from '@/components/molecules';
import { useOpenDotaHeroes } from '@/hooks/useOpenDotaHeroes';

const primaryAttrOptions = [
  { value: 'all', label: 'All attributes' },
  { value: 'str', label: 'Strength' },
  { value: 'agi', label: 'Agility' },
  { value: 'int', label: 'Intelligence' },
  { value: 'all_attr', label: 'Universal' },
] as const;

export function HeroesPage() {
  const { data: heroes, loading, error } = useOpenDotaHeroes();
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedPrimaryAttr, setSelectedPrimaryAttr] = useState('all');

  const deferredSearch = useDeferredValue(search);

  const roles = useMemo(() => {
    const roleSet = new Set<string>();
    for (const hero of heroes) {
      for (const role of hero.roles) {
        roleSet.add(role);
      }
    }

    return ['all', ...Array.from(roleSet).sort((a, b) => a.localeCompare(b))];
  }, [heroes]);

  const filteredHeroes = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return heroes.filter((hero) => {
      if (
        normalizedSearch &&
        !hero.localized_name.toLowerCase().includes(normalizedSearch) &&
        !hero.name.toLowerCase().includes(normalizedSearch)
      ) {
        return false;
      }

      if (selectedRole !== 'all' && !hero.roles.includes(selectedRole)) {
        return false;
      }

      if (selectedPrimaryAttr !== 'all') {
        const primaryAttrFilter = selectedPrimaryAttr === 'all_attr' ? 'all' : selectedPrimaryAttr;
        if (hero.primary_attr !== primaryAttrFilter) {
          return false;
        }
      }

      return true;
    });
  }, [deferredSearch, heroes, selectedPrimaryAttr, selectedRole]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography component="h1" variant="h4" fontWeight={700}>
            Heroes (Characters)
          </Typography>
          <Typography color="text.secondary">
            Data source: OpenDota API (31.1.0) `heroStats` endpoint. Filter by name, role, and
            primary attribute.
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
                  label="Search hero"
                  placeholder="Axe, Crystal Maiden..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="hero-role-filter-label">Role</InputLabel>
                  <Select
                    label="Role"
                    labelId="hero-role-filter-label"
                    value={selectedRole}
                    onChange={(event) => setSelectedRole(event.target.value)}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role === 'all' ? 'All roles' : role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="hero-attr-filter-label">Primary attr</InputLabel>
                  <Select
                    label="Primary attr"
                    labelId="hero-attr-filter-label"
                    value={selectedPrimaryAttr}
                    onChange={(event) => setSelectedPrimaryAttr(event.target.value)}
                  >
                    {primaryAttrOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </SurfaceCard>

        <Typography color="text.secondary" variant="body2">
          Showing {filteredHeroes.length} of {heroes.length} heroes
        </Typography>

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        {!loading && !error ? (
          <Grid container spacing={2}>
            {filteredHeroes.map((hero) => (
              <Grid key={hero.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <HeroCard hero={hero} />
              </Grid>
            ))}
          </Grid>
        ) : null}

        {!loading && !error && filteredHeroes.length === 0 ? (
          <Alert severity="info">No heroes match the current filters.</Alert>
        ) : null}
      </Stack>
    </Container>
  );
}
