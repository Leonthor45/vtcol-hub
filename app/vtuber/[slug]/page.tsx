import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVtuberBySlug } from '../../../lib/services/vtuber';
import { getVtubers } from '../../../lib/services/vtubers';
import { LinkButton } from '../../../components/ui/link-button';
import { PageShell } from '../../../components/layout/page-shell';
import { formatCount, getSocialUrl, getYoutubeUrl } from '../../../lib/utils/vtuber';

interface Params {
  slug: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface VtuberPageProps {
  params: Params;
  // searchParams?: Record<string, string | string[] | undefined>;
}

export async function generateStaticParams() {
  const vtubers = await getVtubers();

  return vtubers.map((vtuber) => ({
    slug: vtuber.slug,
  }));
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = params;

  const vtuber = await getVtuberBySlug(slug);

  if (!vtuber) {
    return {
      title: 'VTuber no encontrada',
    };
  }

  return {
    title: `${vtuber.name} | VTCol Hub`,
    description: vtuber.bio,
    openGraph: {
      title: `${vtuber.name} | VTCol Hub`,
      description: vtuber.bio,
      images: [vtuber.banner || vtuber.avatar],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${vtuber.name} | VTCol Hub`,
      description: vtuber.bio,
      images: [vtuber.banner || vtuber.avatar],
    },
  };
}

export default async function VtuberPage({ params }: VtuberPageProps) {
  const { slug } = params;

  const vtuber = await getVtuberBySlug(slug);

  if (!vtuber) {
    notFound();
  }

  const isLive = vtuber.is_live;

  const twitchUrl = vtuber.twitch_username
    ? getSocialUrl('twitch', vtuber.twitch_username)
    : null;

  const youtubeUrl = vtuber.youtube_channel_id
    ? getYoutubeUrl(vtuber.youtube_channel_id)
    : null;

  const tiktokUrl = vtuber.tiktok
    ? getSocialUrl('tiktok', vtuber.tiktok)
    : null;

  const instagramUrl = vtuber.instagram
    ? getSocialUrl('instagram', vtuber.instagram)
    : null;

  const twitterUrl = vtuber.twitter
    ? getSocialUrl('twitter', vtuber.twitter)
    : null;

  return (
    <PageShell>
      <main className="space-y-10">
        <section className="glass-card overflow-hidden rounded-[36px] border border-white/10 shadow-soft">
          {/* Banner */}
          <div className="relative h-[340px] overflow-hidden">
            <Image
              src={vtuber.banner || vtuber.avatar}
              alt={`${vtuber.name} banner`}
              fill
              priority
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-700/20 via-transparent to-fuchsia-600/20" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-6">
                    <Image
                      src={vtuber.avatar}
                      alt={vtuber.name}
                      width={112}
                      height={112}
                      className="rounded-[28px] border-2 border-violet-500/40 object-cover shadow-[0_0_30px_rgba(139,92,246,.45)]"
                    />
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                        VTCol Hub
                      </p>
                      <h1 className="mt-2 text-5xl font-black tracking-tight text-white">
                        {vtuber.name}
                      </h1>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-violet-500/20 px-4 py-1 text-sm font-semibold text-violet-300">
                          🇨🇴 {vtuber.country}
                        </span>
                        <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-slate-300">
                          @{vtuber.twitch_username}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      className={`rounded-3xl border px-8 py-5 text-center transition ${
                        isLive ? 'border-red-500/40 bg-red-500/10' : 'border-white/10 bg-slate-900/70'
                      }`}
                    >
                      <p
                        className={`font-bold tracking-[0.25em] ${
                          isLive ? 'text-red-400' : 'text-slate-400'
                        }`}
                      >
                        {isLive ? '🔴 EN DIRECTO' : '⚫ OFFLINE'}
                      </p>

                      {isLive && (
                        <p className="mt-3 text-3xl font-black text-white">
                          {formatCount(vtuber.twitch_viewers)}
                        </p>
                      )}

                      {isLive && <p className="text-sm text-slate-400">espectadores</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-8">
            {/* Estadísticas */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {/* Twitch */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-violet-500/40">
                <p className="text-xs uppercase tracking-[0.25em] text-violet-300">🟣 Twitch</p>
                <p className="mt-4 text-4xl font-black text-white">
                  {formatCount(vtuber.twitch_followers)}
                </p>
                <p className="mt-2 text-sm text-slate-400">Seguidores</p>
              </div>

              {/* YouTube */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-red-500/40">
                <p className="text-xs uppercase tracking-[0.25em] text-red-400">🔴 YouTube</p>
                <p className="mt-4 text-4xl font-black text-white">
                  {formatCount(vtuber.youtube_subscribers)}
                </p>
                <p className="mt-2 text-sm text-slate-400">Suscriptores</p>
              </div>

              {/* TikTok */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-pink-500/40">
                <p className="text-xs uppercase tracking-[0.25em] text-pink-400">🎵 TikTok</p>
                <p className="mt-4 text-4xl font-black text-white">
                  {formatCount(vtuber.tiktok_followers)}
                </p>
                <p className="mt-2 text-sm text-slate-400">Seguidores</p>
              </div>

              {/* Instagram */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-orange-500/40">
                <p className="text-xs uppercase tracking-[0.25em] text-orange-400">📸 Instagram</p>
                <p className="mt-4 text-4xl font-black text-white">
                  {formatCount(vtuber.instagram_followers)}
                </p>
                <p className="mt-2 text-sm text-slate-400">Seguidores</p>
              </div>
            </div>

            {/* Panel LIVE */}
            {isLive && (
              <section className="rounded-[32px] border border-red-500/30 bg-gradient-to-br from-red-500/10 to-slate-950 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">🔴 EN DIRECTO</p>
                    <h2 className="mt-2 text-3xl font-black text-white">Actualmente transmitiendo</h2>
                  </div>

                  <div className="text-right">
                    <p className="text-5xl font-black text-white">{formatCount(vtuber.twitch_viewers)}</p>
                    <p className="text-slate-400">espectadores</p>
                  </div>
                </div>

                {vtuber.current_game && (
                  <div className="mt-8 rounded-3xl bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">JUEGO</p>
                    <p className="mt-3 text-2xl font-bold text-white">🎮 {vtuber.current_game}</p>
                  </div>
                )}

                {vtuber.stream_title && (
                  <div className="mt-6 rounded-3xl bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">TÍTULO DEL STREAM</p>
                    <p className="mt-3 text-lg italic text-slate-300">"{vtuber.stream_title}"</p>
                  </div>
                )}
              </section>
            )}

            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
              {/* Biografía */}
              <section className="rounded-[32px] border border-white/10 bg-slate-950/50 p-8">
                <h2 className="text-3xl font-black text-white">Sobre {vtuber.name}</h2>
                <p className="mt-6 leading-8 text-slate-300">{vtuber.bio}</p>

                <div className="mt-10 flex flex-wrap gap-3">
                  {twitchUrl && (
                    <LinkButton href={twitchUrl} target="_blank" rel="noreferrer">
                      🟣 Twitch
                    </LinkButton>
                  )}

                  {youtubeUrl && (
                    <LinkButton href={youtubeUrl} target="_blank" rel="noreferrer">
                      🔴 YouTube
                    </LinkButton>
                  )}

                  {tiktokUrl && (
                    <LinkButton href={tiktokUrl} target="_blank" rel="noreferrer">
                      ⚫ TikTok
                    </LinkButton>
                  )}

                  {instagramUrl && (
                    <LinkButton href={instagramUrl} target="_blank" rel="noreferrer">
                      📸 Instagram
                    </LinkButton>
                  )}

                  {twitterUrl && (
                    <LinkButton href={twitterUrl} target="_blank" rel="noreferrer">
                      ✖ X
                    </LinkButton>
                  )}
                </div>

              </section>

              {/* Panel lateral */}
              <aside className="rounded-[32px] border border-white/10 bg-slate-950/50 p-8">
                <h2 className="text-2xl font-black text-white">Información</h2>

                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">País</p>
                    <p className="mt-2 text-lg font-semibold text-white">🇨🇴 {vtuber.country}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Twitch</p>
                    <p className="mt-2 text-white">@{vtuber.twitch_username}</p>
                  </div>

                  {vtuber.website && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Sitio web</p>
                      <a
                        href={vtuber.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block break-all text-violet-300 hover:text-violet-200"
                      >
                        {vtuber.website}
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Registrado</p>
                    <p className="mt-2 text-white">{new Date(vtuber.created_at).toLocaleDateString('es-CO')}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Última actualización</p>
                    <p className="mt-2 text-white">{new Date(vtuber.updated_at).toLocaleDateString('es-CO')}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <LinkButton href="/" variant="primary" className="w-full justify-center">
                    ← Volver al directorio
                  </LinkButton>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
