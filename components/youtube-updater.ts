import { supabaseAdmin } from '../../supabase-admin';
import { getYoutubeChannels } from '../youtube';
import type { Database } from '../../types/supabase';
import type { Vtuber } from '../../types/vtuber';

type SupabaseListResult<T> = { data: T[] | null; error: any | null };

type YoutubeUpdatePayload = Database['public']['Tables']['vtubers']['Update'];

const vtubersQuery = supabaseAdmin.from('vtubers') as any;

export async function updateYoutube() {
  console.log('\n========== YOUTUBE ==========\n');

  const limite = new Date(Date.now() - 30 * 60 * 1000).toISOString();

  const res = (await supabaseAdmin
    .from('vtubers')
    .select('*')
    .or(`youtube_updated_at.is.null,youtube_updated_at.lt.${limite}`)) as unknown as SupabaseListResult<Vtuber>;

  if (res.error) {
    throw res.error;
  }

  const vtubers = res.data ?? [];

  if (!vtubers.length) {
    console.log('No hay VTubers para actualizar.');
    return;
  }

  const ids = vtubers
    .filter((v) => v.youtube_channel_id)
    .map((v) => v.youtube_channel_id);

  console.log(`Consultando ${ids.length} canales en una sola petición...`);

  const channels = await getYoutubeChannels(ids);

  const updates = vtubers.map(async (vtuber) => {
    if (!vtuber.youtube_channel_id) return;

    const youtube = channels.get(vtuber.youtube_channel_id);

    if (!youtube) {
      console.log(`No encontrado: ${vtuber.name}`);
      return;
    }

    const payload: YoutubeUpdatePayload = {
      youtube_subscribers: youtube.subscribers,
      avatar: youtube.avatar,
      youtube_updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await vtubersQuery
      .update(payload)
      .eq('id', vtuber.id);

    if (updateError) {
      console.error(updateError);
      return;
    }

    console.log(
      `✓ ${vtuber.name}: ${youtube.subscribers.toLocaleString()} suscriptores`
    );
  });

  await Promise.all(updates);

  console.log('\nYouTube actualizado.\n');
}
