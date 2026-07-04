'use client';

import type { ChangeEvent } from 'react';
import type { Vtuber } from '../../lib/types/vtuber';
import { SearchBar } from './search-bar';
import { VtuberCard } from '../cards/vtuber-card';
import { useVtuberSearch } from '../../hooks/useVtuberSearch';

interface VtuberDirectoryProps {
  vtubers: Vtuber[];
}

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'live', label: 'Live' },
  { value: 'offline', label: 'Offline' },
  { value: 'featured', label: 'Featured' },
] as const;

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'twitch', label: 'Seguidores Twitch' },
  { value: 'youtube', label: 'Suscriptores YouTube' },
  { value: 'name', label: 'Nombre' },
] as const;

export function VtuberDirectory({ vtubers }: VtuberDirectoryProps) {
  const {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredVtubers,
  } = useVtuberSearch(vtubers);

  function handleStatusChange(value: string) {
    setStatusFilter(value as typeof statusFilter);
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as typeof sortBy);
  }

  return (
    <section>
      <div className="mb-8 space-y-3">
        <SearchBar value={query} onChange={setQuery} />

        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-3 shadow-soft backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isActive = statusFilter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleStatusChange(option.value)}
                  className={`rounded-full px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-violet-500/20 text-violet-200'
                      : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label htmlFor="vtuber-sort" className="text-sm text-slate-400">
              Ordenar por
            </label>
            <select
              id="vtuber-sort"
              value={sortBy}
              onChange={handleSortChange}
              className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
        {filteredVtubers.map((vtuber) => (
          <VtuberCard key={vtuber.id} vtuber={vtuber} />
        ))}
      </div>
    </section>
  );
}
