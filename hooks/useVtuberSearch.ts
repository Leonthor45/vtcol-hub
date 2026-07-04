import { useMemo, useState } from 'react';
import type { Vtuber } from '../types/vtuber';

export type SortOption =
  | 'live'
  | 'twitch'
  | 'youtube'
  | 'name';

export function useVtuberSearch(vtubers: Vtuber[]) {
  const [query, setQuery] = useState('');

  const [sortBy, setSortBy] =
    useState<SortOption>('live');

  const [showFilters, setShowFilters] =
    useState(false);

  const filteredVtubers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    let result = vtubers;

    // ==========================
    // BUSCADOR
    // ==========================

    if (normalized) {
      result = vtubers.filter((vtuber) => {
        return (
          vtuber.name.toLowerCase().includes(normalized) ||
          vtuber.twitch_username
            .toLowerCase()
            .includes(normalized)
        );
      });
    }

    // ==========================
    // ORDEN
    // ==========================

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'live':
          if (a.is_live !== b.is_live) {
            return Number(b.is_live) - Number(a.is_live);
          }

          return (
            (b.twitch_followers ?? 0) -
            (a.twitch_followers ?? 0)
          );

        case 'twitch':
          return (
            (b.twitch_followers ?? 0) -
            (a.twitch_followers ?? 0)
          );

        case 'youtube':
          return (
            (b.youtube_subscribers ?? 0) -
            (a.youtube_subscribers ?? 0)
          );

        case 'name':
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    });

    return result;
  }, [query, sortBy, vtubers]);

  return {
    query,
    setQuery,

    sortBy,
    setSortBy,

    showFilters,
    setShowFilters,

    filteredVtubers,
  };
}