import { revalidatePath } from 'next/cache';
import { PageShell } from '../../components/layout/page-shell';
import { getTwitchChannel } from '../../lib/services/twitch';
import { getYoutubeChannel } from '../../lib/services/youtube';
import { getVtubers } from '../../lib/services/vtubers';
import { supabaseAdmin } from '../../lib/supabase-admin';
import type { Vtuber } from '../../lib/types/vtuber';

async function createVtuber(formData: FormData) {
  'use server';

  const name = String(formData.get('name') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const twitchUsername = String(formData.get('twitch_username') ?? '').trim();
  const youtubeChannelId = String(formData.get('youtube_channel_id') ?? '').trim();
  const featured = formData.get('featured') === 'on';
  const bio = String(formData.get('bio') ?? '').trim();
  const country = String(formData.get('country') ?? '').trim();

  if (!name || !slug) {
    return;
  }

  const payload: Partial<Vtuber> = {
    id: crypto.randomUUID(),
    name,
    slug,
    twitch_username: twitchUsername,
    youtube_channel_id: youtubeChannelId,
    featured,
    bio,
    country,
    avatar: '/avatars/default.png',
    banner: '/banners/default.png',
    tiktok: '',
    instagram: '',
    twitter: '',
    website: '',
    is_live: false,
    twitch_followers: 0,
    youtube_subscribers: 0,
    tiktok_followers: 0,
    instagram_followers: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await (supabaseAdmin.from('vtubers') as any).insert(payload);
  revalidatePath('/');
  revalidatePath('/admin');
  return;
}

async function updateVtuber(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const twitchUsername = String(formData.get('twitch_username') ?? '').trim();
  const youtubeChannelId = String(formData.get('youtube_channel_id') ?? '').trim();
  const featured = formData.get('featured') === 'on';
  const bio = String(formData.get('bio') ?? '').trim();
  const country = String(formData.get('country') ?? '').trim();

  if (!id || !name || !slug) {
    return;
  }

  const payload: Partial<Vtuber> = {
    name,
    slug,
    twitch_username: twitchUsername,
    youtube_channel_id: youtubeChannelId,
    featured,
    bio,
    country,
    updated_at: new Date().toISOString(),
  };

  await (supabaseAdmin.from('vtubers') as any).update(payload).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin');
  return;
}

async function deleteVtuber(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '').trim();

  if (!id) {
    return;
  }

  await (supabaseAdmin.from('vtubers') as any).delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin');
  return;
}

async function refreshVtuber(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '').trim();

  if (!id) {
    return;
  }

  const { data: vtuber } = await (supabaseAdmin.from('vtubers') as any).select('*').eq('id', id).single();

  if (!vtuber) {
    return;
  }

  const [twitch, youtube] = await Promise.all([
    vtuber.twitch_username ? getTwitchChannel(vtuber.twitch_username) : null,
    vtuber.youtube_channel_id ? getYoutubeChannel(vtuber.youtube_channel_id) : null,
  ]);

  const payload = {
    avatar: twitch?.avatar || youtube?.avatar || vtuber.avatar || '/avatars/default.png',
    banner: twitch?.banner || vtuber.banner || '/banners/default.png',
    is_live: twitch?.isLive ?? vtuber.is_live ?? false,
    twitch_followers: twitch?.followers ?? vtuber.twitch_followers ?? 0,
    youtube_subscribers: youtube?.subscribers ?? vtuber.youtube_subscribers ?? 0,
    updated_at: new Date().toISOString(),
  };

  await (supabaseAdmin.from('vtubers') as any).update(payload).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin');
  return;
}

export default async function AdminPage() {
  const vtubers = await getVtubers();

  return (
    <PageShell>
      <main className="space-y-8">
        <section className="glass-card rounded-[32px] p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Administración</p>
              <h1 className="text-3xl font-semibold text-white">Panel de VTubers</h1>
            </div>
            <a href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
              Volver al directorio
            </a>
          </div>
        </section>

        <section className="glass-card rounded-[32px] p-8">
          <h2 className="text-xl font-semibold text-white">Crear VTuber</h2>
          <form action={createVtuber} className="mt-6 grid gap-4 md:grid-cols-2">
            <input name="name" placeholder="Nombre" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <input name="slug" placeholder="Slug" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <input name="twitch_username" placeholder="Usuario Twitch" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <input name="youtube_channel_id" placeholder="YouTube channel ID" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <input name="country" placeholder="País" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              <input type="checkbox" name="featured" className="rounded border-white/10 bg-transparent" />
              Destacado
            </label>
            <textarea name="bio" placeholder="Biografía" className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
            <button type="submit" className="md:col-span-2 rounded-2xl bg-violet-500 px-4 py-3 font-medium text-white">
              Crear VTuber
            </button>
          </form>
        </section>

        <section className="glass-card rounded-[32px] p-8">
          <h2 className="text-xl font-semibold text-white">Gestionar VTubers</h2>
          <div className="mt-6 space-y-4">
            {vtubers.map((vtuber) => (
              <div key={vtuber.id} className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{vtuber.name}</p>
                    <p className="text-sm text-slate-400">{vtuber.slug} • {vtuber.twitch_username || 'Sin Twitch'} • {vtuber.youtube_channel_id || 'Sin YouTube'}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={deleteVtuber} className="inline-flex">
                      <input type="hidden" name="id" value={vtuber.id} />
                      <button type="submit" className="rounded-full border border-rose-500/30 px-3 py-2 text-sm text-rose-300">
                        Eliminar
                      </button>
                    </form>
                    <form action={refreshVtuber} className="inline-flex">
                      <input type="hidden" name="id" value={vtuber.id} />
                      <button type="submit" className="rounded-full border border-violet-500/30 px-3 py-2 text-sm text-violet-200">
                        Actualizar
                      </button>
                    </form>
                  </div>
                </div>

                <form action={updateVtuber} className="grid gap-3 md:grid-cols-2">
                  <input type="hidden" name="id" value={vtuber.id} />
                  <input name="name" defaultValue={vtuber.name} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white" />
                  <input name="slug" defaultValue={vtuber.slug} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white" />
                  <input name="twitch_username" defaultValue={vtuber.twitch_username} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white" />
                  <input name="youtube_channel_id" defaultValue={vtuber.youtube_channel_id} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white" />
                  <input name="country" defaultValue={vtuber.country} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white" />
                  <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                    <input type="checkbox" name="featured" defaultChecked={vtuber.featured} className="rounded border-white/10 bg-transparent" />
                    Destacado
                  </label>
                  <textarea name="bio" defaultValue={vtuber.bio} className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white" />
                  <button type="submit" className="md:col-span-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200">
                    Guardar cambios
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
