'use client';

import type { Vtuber } from '../../types/vtuber';
import { SearchBar } from './search-bar';
import { VtuberCard } from '../cards/vtuber-card';
import { useVtuberSearch } from '../../hooks/useVtuberSearch';

interface VtuberDirectoryProps {
  vtubers: Vtuber[];
}

export function VtuberDirectory({ vtubers }: VtuberDirectoryProps) {
  const { query, setQuery, filteredVtubers } = useVtuberSearch(vtubers);

  return (
    <section>
      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
        {filteredVtubers.map((vtuber) => (
          <VtuberCard key={vtuber.id} vtuber={vtuber} />
        ))}
      </div>
    </section>
  );
}
