import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="mb-10 rounded-[32px] border border-white/10 bg-slate-950/40 p-7 shadow-soft backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-3 rounded-full border border-violet-400/15 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            Directorio VTuber colombiano
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">VTCol Hub</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
              Un catálogo moderno de VTubers colombianos con estilo elegante, filtros y fichas individuales.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Explorar VTubers
        </Link>
      </div>
    </header>
  );
}
