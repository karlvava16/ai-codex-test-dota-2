export type OpenDotaHero = {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: 'str' | 'agi' | 'int' | 'all';
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
};

export type OpenDotaItemRaw = {
  id?: number;
  dname?: string;
  cost?: number;
  qual?: string;
  img?: string;
  notes?: string;
  shop_tags?: string;
  tier?: number;
};

export type OpenDotaItemsResponse = Record<string, OpenDotaItemRaw>;

export type OpenDotaItem = {
  key: string;
  id?: number;
  displayName: string;
  cost?: number;
  qual?: string;
  img?: string;
  notes?: string;
  tier?: number;
  shopTags: string[];
};
