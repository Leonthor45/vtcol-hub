import 'dotenv/config';
import { supabaseAdmin } from '../lib/supabase-admin';
import { mockVtubers } from '../lib/data/mock-vtubers';

async function importVtubers() {
  console.log(`Importando ${mockVtubers.length} VTubers...`);

  const { error } = await supabaseAdmin
    .from('vtubers')
    .upsert(mockVtubers, {
      onConflict: 'id',
    });

  if (error) {
    console.error('❌ Error:');
    console.error(error);
    process.exit(1);
  }

  console.log('✅ Importación completada.');
}

importVtubers().catch((err) => {
  console.error(err);
  process.exit(1);
});