'use client';

import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/60 px-4 py-3 shadow-soft backdrop-blur-xl">
      <label htmlFor="vtuber-search" className="sr-only">
        Buscar VTuber
      </label>
      <input
        id="vtuber-search"
        value={value}
        onChange={handleInput}
        type="search"
        placeholder="Buscar por nombre, Twitch o país..."
        className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
      />
    </div>
  );
}
