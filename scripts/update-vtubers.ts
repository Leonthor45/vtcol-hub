import 'dotenv/config';

import { updateYoutube } from '../lib/services/updater/youtube-updater';
import { updateTwitch } from '../lib/services/updater/twitch-updater';

async function run() {
  console.log('==================================');
  console.log('      VTCol Hub Updater');
  console.log('==================================');

  await updateYoutube();
  await updateTwitch();

  console.log('\n==================================');
  console.log('Actualización finalizada.');
  console.log('==================================');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});