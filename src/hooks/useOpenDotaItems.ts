import { useEffect, useState } from 'react';

import { getItems } from '@/services/opendota/client';
import type { OpenDotaItem } from '@/services/opendota/types';

type OpenDotaItemsState = {
  data: OpenDotaItem[];
  error: string | null;
  loading: boolean;
};

export function useOpenDotaItems() {
  const [state, setState] = useState<OpenDotaItemsState>({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    getItems(controller.signal)
      .then((data) => {
        setState({
          data,
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
          error: error instanceof Error ? error.message : 'Failed to load items',
          loading: false,
        });
      });

    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
