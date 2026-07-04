import { useMemo, useState } from 'react';
import type { Vtuber } from '../lib/types/vtuber';

type StatusFilter = 'all' | 'live' | 'offline' | 'featured';
type SortOption = 'featured' | 'twitch' | 'youtube' | 'name';

export function useVtuberSearch(vtubers: Vtuber[]) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredVtubers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const base = vtubers.filter((vtuber) => {
      const haystack = [
        vtuber.name,
        vtuber.slug,
        vtuber.twitch_username,
        vtuber.youtube_channel_id,
        vtuber.country,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesQuery = !normalized || haystack.includes(normalized);

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'featured'
            ? vtuber.featured
            : statusFilter === 'live'
              ? vtuber.is_live
              : !vtuber.is_live;

      return matchesQuery && matchesStatus;
    });

    return [...base].sort((a, b) => {
      if (sortBy === 'twitch') {
        return (b.twitch_followers ?? 0) - (a.twitch_followers ?? 0);
      }

      if (sortBy === 'youtube') {
        return (b.youtube_subscribers ?? 0) - (a.youtube_subscribers ?? 0);
      }

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });
  }, [query, statusFilter, sortBy, vtubers]);

  return {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredVtubers,
  };
}
