import { useEffect, useState } from 'react';

import { getHeroes } from '@/services/opendota/client';
import type { OpenDotaHero } from '@/services/opendota/types';

type OpenDotaHeroesState = {
  data: OpenDotaHero[];
  error: string | null;
  loading: boolean;
};

export function useOpenDotaHeroes() {
  const [state, setState] = useState<OpenDotaHeroesState>({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    getHeroes(controller.signal)
      .then((data) => {
        setState({
          data: [...data].sort((a, b) => a.localized_name.localeCompare(b.localized_name)),
          error: null,
          loading: false,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          data: [],
          error: error instanceof Error ? error.message : 'Failed to load heroes',
          loading: false,
        });
      });

    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
