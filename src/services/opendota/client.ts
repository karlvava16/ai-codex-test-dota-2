import type {
  OpenDotaHero,
  OpenDotaItem,
  OpenDotaItemsResponse,
  OpenDotaItemRaw,
} from '@/services/opendota/types';

const OPEN_DOTA_API_BASE_URL = 'https://api.opendota.com/api';

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${OPEN_DOTA_API_BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`OpenDota request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export function getHeroes(signal?: AbortSignal) {
  return fetchJson<OpenDotaHero[]>('/heroStats', signal);
}

function normalizeItem(key: string, item: OpenDotaItemRaw): OpenDotaItem {
  const displayName = item.dname?.trim() || key.replaceAll('_', ' ');
  const shopTags = item.shop_tags
    ? item.shop_tags
        .split(';')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return {
    key,
    id: item.id,
    displayName,
    cost: item.cost,
    qual: item.qual,
    img: item.img,
    notes: item.notes,
    tier: item.tier,
    shopTags,
  };
}

export async function getItems(signal?: AbortSignal) {
  const rawItems = await fetchJson<OpenDotaItemsResponse>('/constants/items', signal);

  return Object.entries(rawItems)
    .map(([key, item]) => normalizeItem(key, item))
    .filter((item) => item.displayName)
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}
