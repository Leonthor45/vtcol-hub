import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVtuberBySlug, getVtubers } from '../../../lib/services/vtubers';
import { LinkButton } from '../../../components/ui/link-button';
import { PageShell } from '../../../components/layout/page-shell';
import { formatCount, getSocialUrl, getYoutubeUrl } from '../../../lib/utils/vtuber';

interface VtuberPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const vtubers = await getVtubers();
  return vtubers.map((vtuber) => ({ slug: vtuber.slug }));
}

export async function generateMetadata({ params }: VtuberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vtuber = await getVtuberBySlug(slug);

  if (!vtuber) {
    return {
      title: 'VTCol Hub',
      description: 'Directorio de VTubers colombianos.',
    };
  }

  return {
    title: `${vtuber.name} | VTCol Hub`,
    description: vtuber.bio,
  };
}

export default async function VtuberPage({ params }: VtuberPageProps) {
  const { slug } = await params;
  const vtuber = await getVtuberBySlug(slug);

  if (!vtuber) {
    notFound();
    return <></>;
  }

  const isLive = vtuber.is_live;
  const twitchUrl = getSocialUrl('twitch', vtuber.twitch_username);
  const youtubeUrl = getYoutubeUrl(vtuber.youtube_channel_id);
  const tiktokUrl = getSocialUrl('tiktok', vtuber.tiktok);
  const instagramUrl = getSocialUrl('instagram', vtuber.instagram);
  const twitterUrl = getSocialUrl('twitter', vtuber.twitter);

  return (
    <PageShell>
      <main className="space-y-8">
        <section className="glass-card overflow-hidden rounded-[32px] border border-white/10 shadow-soft">
          <div className="relative h-72 overflow-hidden bg-slate-900/80">
            <img src={vtuber.banner} alt={`${vtuber.name} banner`} className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute left-6 bottom-6 right-6 rounded-[28px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl sm:max-w-2xl">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img src={vtuber.avatar} alt={`${vtuber.name} avatar`} className="h-24 w-24 rounded-3xl border border-white/10 object-cover" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">VTuber de Colombia</p>
                    <h1 className="text-3xl font-semibold text-white">{vtuber.name}</h1>
                    <p className="text-sm text-slate-300">{vtuber.twitch_username}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-950/80 px-5 py-3 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={isLive ? 'text-rose-400' : 'text-slate-400'}>
                      {isLive ? '🔴 EN DIRECTO' : '⚫ Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-8">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Seguidores Twitch</p>
                <p className="mt-3 text-2xl font-semibold text-white">{formatCount(vtuber.twitch_followers)}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Subs YouTube</p>
                <p className="mt-3 text-2xl font-semibold text-white">{formatCount(vtuber.youtube_subscribers)}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">TikTok</p>
                <p className="mt-3 text-2xl font-semibold text-white">{formatCount(vtuber.tiktok_followers)}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Instagram</p>
                <p className="mt-3 text-2xl font-semibold text-white">{formatCount(vtuber.instagram_followers)}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
                <h2 className="text-xl font-semibold text-white">Biografía</h2>
                <p className="text-slate-300 leading-7">{vtuber.bio}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {twitchUrl && (
                    <LinkButton href={twitchUrl} target="_blank" rel="noreferrer">
                      Twitch
                    </LinkButton>
                  )}
                  {youtubeUrl && (
                    <LinkButton href={youtubeUrl} target="_blank" rel="noreferrer">
                      YouTube
                    </LinkButton>
                  )}
                  {tiktokUrl && (
                    <LinkButton href={tiktokUrl} target="_blank" rel="noreferrer">
                      TikTok
                    </LinkButton>
                  )}
                  {instagramUrl && (
                    <LinkButton href={instagramUrl} target="_blank" rel="noreferrer">
                      Instagram
                    </LinkButton>
                  )}
                  {twitterUrl && (
                    <LinkButton href={twitterUrl} target="_blank" rel="noreferrer">
                      X
                    </LinkButton>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6">
                <h2 className="text-xl font-semibold text-white">Enlaces rápidos</h2>
                <div className="mt-5 space-y-3 text-slate-300">
                  {vtuber.website ? (
                    <p>
                      <span className="font-semibold text-white">Sitio web:</span> {vtuber.website}
                    </p>
                  ) : null}
                  <p>
                    <span className="font-semibold text-white">Creado:</span> {new Date(vtuber.created_at).toLocaleDateString('es-CO')}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Actualizado:</span> {new Date(vtuber.updated_at).toLocaleDateString('es-CO')}
                  </p>
                </div>
                <div className="mt-6">
                  <LinkButton href="/" variant="primary">
                    Volver al directorio
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
