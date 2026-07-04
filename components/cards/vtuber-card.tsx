import Image from 'next/image';
import Link from 'next/link';

import type { Vtuber } from '../../types/vtuber';
import { LinkButton } from '../ui/link-button';
import {
  formatCount,
  getSocialUrl,
  getYoutubeUrl,
} from '../../lib/utils/vtuber';

interface VtuberCardProps {
  vtuber: Vtuber;
}

export function VtuberCard({
  vtuber,
}: VtuberCardProps) {

  const isLive = vtuber.is_live;

  const twitchUrl = getSocialUrl(
    'twitch',
    vtuber.twitch_username
  );

  const youtubeUrl = getYoutubeUrl(
    vtuber.youtube_channel_id
  );

  const tiktokUrl = getSocialUrl(
    'tiktok',
    vtuber.tiktok
  );

  const instagramUrl = getSocialUrl(
    'instagram',
    vtuber.instagram
  );

  const twitterUrl = getSocialUrl(
    'twitter',
    vtuber.twitter
  );

  return (

    <article
      className="
      group
      overflow-hidden
      rounded-[34px]
      border
      border-slate-700
      bg-[#0b1120]
      shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-violet-500/40
      "
    >
      {/* ========================= */}
      {/* BANNER */}
      {/* ========================= */}

      <div className="relative h-52 overflow-hidden">

        <Image
          src={vtuber.banner || vtuber.avatar}
          alt={`${vtuber.name} banner`}
          fill
          priority
          className="pointer-events-none object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/50 to-transparent" />

        {isLive && (
          <div className="absolute right-5 top-5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xl animate-pulse">
            🔴 EN DIRECTO
          </div>
        )}

      </div>

      {/* ========================= */}
      {/* CONTENIDO */}
      {/* ========================= */}

      <div className="relative z-10 px-7 pb-7">

        {/* Avatar */}

        <div className="-mt-16 flex items-end gap-5">

          <Image
            src={vtuber.avatar}
            alt={`${vtuber.name} avatar`}
            width={118}
            height={118}
            className="
              rounded-[30px]
              border-4
              border-[#0b1120]
              shadow-2xl
              object-cover
              transition
              duration-300
              group-hover:scale-105
            "
          />

          <div className="pb-2 flex-1">

            <Link
              href={`/vtuber/${vtuber.slug}`}
              className="block text-3xl font-bold text-white transition hover:text-violet-300"
            >
              {vtuber.name}
            </Link>

            <p className="mt-1 text-sm text-slate-300">
              @{vtuber.twitch_username}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              🇨🇴 {vtuber.country}
            </p>

          </div>

        </div>
             {/* ========================= */}
        {/* STREAM INFO */}
        {/* ========================= */}

        {isLive && (
          <div className="mt-7 rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-600/20 to-pink-600/10 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold uppercase tracking-widest text-red-300">
                  🔴 En vivo ahora
                </p>

                <p className="mt-2 text-4xl font-black text-white">
                  {formatCount(vtuber.twitch_viewers)}
                </p>

                <p className="text-sm text-slate-300">
                  espectadores
                </p>

              </div>

            </div>

            {vtuber.current_game && (

              <div className="mt-5">

                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  JUGANDO
                </p>

                <p className="mt-2 text-lg font-semibold text-white">
                  🎮 {vtuber.current_game}
                </p>

              </div>

            )}

            {vtuber.stream_title && (

              <div className="mt-5">

                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  STREAM
                </p>

                <p className="mt-2 italic leading-relaxed text-slate-300">
                  "{vtuber.stream_title}"
                </p>

              </div>

            )}

          </div>
        )}

        {/* ========================= */}
        {/* ESTADÍSTICAS */}
        {/* ========================= */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-3xl bg-[#151d34] p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              🟣 Twitch
            </p>

            <p className="mt-4 text-4xl font-black text-white">
              {formatCount(vtuber.twitch_followers)}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Seguidores
            </p>

          </div>

          <div className="rounded-3xl bg-[#151d34] p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-red-300">
              🔴 YouTube
            </p>

            <p className="mt-4 text-4xl font-black text-white">
              {formatCount(vtuber.youtube_subscribers)}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Suscriptores
            </p>

          </div>

        </div>
        {/* ========================= */}
        {/* BOTONES */}
        {/* ========================= */}

        <div className="mt-8 flex flex-wrap gap-3">

          <Link
            href={`/vtuber/${vtuber.slug}`}
            className="
              flex-1
              rounded-2xl
              bg-violet-600
              px-5
              py-3
              text-center
              font-semibold
              text-white
              transition
              hover:bg-violet-500
            "
          >
            👤 Ver perfil
          </Link>

          {twitchUrl && (
            <LinkButton
              href={twitchUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#9146FF] text-white hover:bg-[#7d36ea]"
            >
              🟣 Twitch
            </LinkButton>
          )}

          {youtubeUrl && (
            <LinkButton
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#FF0000] text-white hover:bg-[#d60000]"
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

      </div>

    </article>

  );
}