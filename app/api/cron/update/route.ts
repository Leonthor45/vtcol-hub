import { NextResponse } from 'next/server';
import { updateTwitch } from '../../../../lib/services/updater/twitch-updater';
import { updateYoutube } from '../../../../lib/services/updater/youtube-updater';

export async function GET(request: Request) {
  const authHeader = process.env.CRON_SECRET;
  const requestHeader = request.headers.get('authorization');

  if (authHeader && requestHeader !== `Bearer ${authHeader}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await updateYoutube();
    await updateTwitch();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
