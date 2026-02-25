const OPEN_DOTA_ASSET_BASE_URL = 'https://cdn.cloudflare.steamstatic.com';

export function getOpenDotaAssetUrl(path?: string) {
  if (!path) {
    return '';
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${OPEN_DOTA_ASSET_BASE_URL}${path}`;
}
