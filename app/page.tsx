
import { SiteFooter } from '../components/footer/site-footer';
import { SiteHeader } from '../components/navbar/site-header';
import { VtuberDirectory } from '../components/search/vtuber-directory';
import { PageShell } from '../components/layout/page-shell';
import { getVtubers } from '../lib/services/vtubers';

export const revalidate = 60;

export default async function HomePage() {
  const vtubers = await getVtubers();

  const featuredCount = vtubers.filter((vtuber) => vtuber.featured).length;
  const liveCount = vtubers.filter((vtuber) => vtuber.is_live).length;

  const platforms = ['Twitch', 'YouTube', 'TikTok', 'Instagram'];

  return (
    <PageShell>
      <main className="space-y-10">
        <SiteHeader />

        <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          {/* HERO */}
          <div className="glass-card rounded-[32px] p-8">
            <div className="mb-7 space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                Nuevo diseño inspirado en Hololist para VTubers colombianos
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                El directorio definitivo de VTubers colombianos.
              </h2>

              <p className="max-w-2xl text-slate-300">
                Descubre creadores, consulta sus redes oficiales y encuentra
                quién está en directo desde un solo lugar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  VTubers listados
                </p>

                <p className="mt-4 text-3xl font-semibold text-white">
                  {vtubers.length}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Destacados
                </p>

                <p className="mt-4 text-3xl font-semibold text-white">
                  {featuredCount}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  En vivo ahora
                </p>

                <p className="mt-4 text-3xl font-semibold text-white">
                  {liveCount}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Plataformas
                </p>

                <p className="mt-4 text-3xl font-semibold text-white">
                  {platforms.length}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-300"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO */}
          <div className="glass-card rounded-[32px] p-8">
            <h3 className="text-xl font-semibold text-white">
              ¿Qué encontrarás en VTCol Hub?
            </h3>

            <p className="mt-3 text-slate-300">
              Un directorio diseñado para descubrir VTubers colombianos de forma
              rápida, sencilla y con acceso a todas sus redes oficiales.
            </p>

            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <p>• Perfiles completos con información de cada VTuber.</p>
              <p>• Enlaces oficiales a Twitch, YouTube, TikTok e Instagram.</p>
              <p>• Estado "En directo" de Twitch.</p>
              <p>• Estadísticas actualizadas de YouTube.</p>
            </div>
          </div>
        </section>

        <VtuberDirectory vtubers={vtubers} />

        <SiteFooter />
      </main>
    </PageShell>
  );
}