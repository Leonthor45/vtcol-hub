import Image from 'next/image';
import Link from 'next/link';

import type { Vtuber } from '../../lib/types/vtuber';
import { LinkButton } from '../ui/link-button';
import {
  formatCount,
  getSocialUrl,
  getYoutubeUrl,
} from '../../lib/utils/vtuber';

interface VtuberCardProps {
  vtuber: Vtuber;
}

export function VtuberCard({ vtuber }: VtuberCardProps) {
  const isLive = vtuber.is_live;

  const twitchUrl = getSocialUrl('twitch', vtuber.twitch_username);
  const youtubeUrl = getYoutubeUrl(vtuber.youtube_channel_id);
  const tiktokUrl = getSocialUrl('tiktok', vtuber.tiktok);
  const instagramUrl = getSocialUrl('instagram', vtuber.instagram);
  const twitterUrl = getSocialUrl('twitter', vtuber.twitter);

  return (
    <article className="glass-card group overflow-hidden rounded-[30px] border border-white/10 p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-glow">

      {/* CABECERA */}
      <div className="mb-6 flex items-center gap-4">

        <Image
          src={vtuber.avatar}
          alt={`${vtuber.name} avatar`}
          width={88}
          height={88}
          className="rounded-3xl border border-white/10 object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="flex-1">

          <Link
            href={`/vtuber/${vtuber.slug}`}
            className="text-2xl font-bold text-white transition hover:text-violet-300"
          >
            {vtuber.name}
          </Link>

          <p className="mt-1 text-sm text-slate-400">
            @{vtuber.twitch_username}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            🇨🇴 {vtuber.country}
          </p>

        </div>
      </div>

      {/* ESTADO DEL STREAM */}
      <div className="mb-5">

        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
            isLive
              ? 'bg-red-500/20 text-red-400'
              : 'bg-slate-700/30 text-slate-400'
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isLive
                ? 'bg-red-500 animate-pulse'
                : 'bg-slate-500'
            }`}
          />

          {isLive ? 'EN DIRECTO' : 'OFFLINE'}
        </div>

      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid gap-3 sm:grid-cols-2">

        <div className="rounded-2xl bg-white/5 p-4">

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            🟣 Twitch
          </p>

          <p className="mt-3 text-2xl font-bold text-white">
            {formatCount(vtuber.twitch_followers)}
          </p>

          <p className="text-xs text-slate-400">
            Seguidores
          </p>

        </div>

        <div className="rounded-2xl bg-white/5 p-4">

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            🔴 YouTube
          </p>

          <p className="mt-3 text-2xl font-bold text-white">
            {formatCount(vtuber.youtube_subscribers)}
          </p>

          <p className="text-xs text-slate-400">
            Suscriptores
          </p>

        </div>

      </div>

      {/* BOTONES */}
      <div className="mt-6 flex flex-wrap gap-2">

        <LinkButton
          href={`/vtuber/${vtuber.slug}`}
          variant="primary"
          className="flex-1"
        >
          👤 Perfil
        </LinkButton>

        {twitchUrl && (
          <LinkButton
            href={twitchUrl}
            target="_blank"
            rel="noreferrer"
          >
            🟣 Twitch
          </LinkButton>
        )}

        {youtubeUrl && (
          <LinkButton
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
          >
            🔴 YouTube
          </LinkButton>
        )}

        {tiktokUrl && (
          <LinkButton
            href={tiktokUrl}
            target="_blank"
            rel="noreferrer"
          >
            ⚫ TikTok
          </LinkButton>
        )}

        {instagramUrl && (
          <LinkButton
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            🩷 Instagram
          </LinkButton>
        )}

        {twitterUrl && (
          <LinkButton
            href={twitterUrl}
            target="_blank"
            rel="noreferrer"
          >
            ✖ X
          </LinkButton>
        )}

      </div>

    </article>
  );
}