import { supabaseAdmin } from '../../supabase-admin';
import { getYoutubeChannels } from '../youtube';

export async function updateYoutube() {
  console.log('\n========== YOUTUBE ==========\n');

  const limite = new Date(
    Date.now() - 30 * 60 * 1000
  ).toISOString();

  const { data: vtubers, error } = await supabaseAdmin
    .from('vtubers')
    .select('*')
    .or(
      `youtube_updated_at.is.null,youtube_updated_at.lt.${limite}`
    );

  if (error) {
    throw error;
  }

  if (!vtubers?.length) {
    console.log('No hay VTubers para actualizar.');
    return;
  }

  const ids = vtubers
    .filter(v => v.youtube_channel_id)
    .map(v => v.youtube_channel_id);

  console.log(
    `Consultando ${ids.length} canales en una sola petición...`
  );

  const channels = await getYoutubeChannels(ids);

  const updates = vtubers.map(async (vtuber) => {
    if (!vtuber.youtube_channel_id) return;

    const youtube = channels.get(vtuber.youtube_channel_id);

    if (!youtube) {
      console.log(`No encontrado: ${vtuber.name}`);
      return;
    }

    const { error: updateError } = await supabaseAdmin
      .from('vtubers')
      .update({
        youtube_subscribers: youtube.subscribers,
        avatar: youtube.avatar,
        youtube_updated_at: new Date().toISOString(),
      })
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