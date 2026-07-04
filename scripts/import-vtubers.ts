// scripts/import-vtubers.ts
import 'dotenv/config';
import { supabaseAdmin } from '../lib/supabase-admin';

let mockVtubers: any[] = [];

try {
  // require dinámico para evitar error de compilación si el archivo no existe
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('../lib/data/mock-vtubers');
  mockVtubers = mod?.mockVtubers ?? [];
} catch (err) {
  console.warn('No se encontró ../lib/data/mock-vtubers. Se usará lista vacía para importación.');
}

async function importVtubers() {
  console.log(`Importando ${mockVtubers.length} VTubers...`);

  if (mockVtubers.length === 0) {
    console.log('No hay datos para importar. Abortando importación.');
    return;
  }

  const sanitizedVtubers = mockVtubers.map(({ clips, ...rest }) => rest);

  const vtubersTable = supabaseAdmin.from('vtubers') as any;
  const { error } = await vtubersTable.upsert(sanitizedVtubers, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error al importar VTubers:', error);
    process.exit(1);
  }

  console.log('✅ Importación completada.');
}

importVtubers().catch((err) => {
  console.error(err);
  process.exit(1);
});
