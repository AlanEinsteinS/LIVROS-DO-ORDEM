import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import seedData from './seed-data.json' with { type: 'json' };

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function run(query, context) {
  const { data, error } = await query;
  if (error) {
    throw new Error(`${context}: ${error.message}`);
  }
  return data;
}

async function main() {
  console.log('Starting Supabase seed...');

  await run(supabase.from('books').delete().neq('id', '00000000-0000-0000-0000-000000000000'), 'Clear books');
  await run(supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000'), 'Clear categories');
  await run(supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000'), 'Clear users');

  const categories = await run(
    supabase.from('categories').insert(seedData.categories).select('id, slug'),
    'Insert categories'
  );

  const categoryIdBySlug = new Map(categories.map((category) => [category.slug, category.id]));

  const allBooks = [
    ...seedData.officialBooks,
    ...seedData.homebrewBooks,
    ...seedData.passageEditions
  ].map((book) => ({
    title: book.title,
    icon: book.icon,
    url: book.url,
    category_id: categoryIdBySlug.get(book.categorySlug),
    order: book.order,
    locked: Boolean(book.locked),
    access_key: book.locked ? book.accessKey || null : null
  }));

  await run(supabase.from('books').insert(allBooks), 'Insert books');

  const hashedPassword = await bcrypt.hash('alan2458', 10);
  await run(
    supabase.from('users').insert({
      username: 'admin',
      password: hashedPassword
    }),
    'Insert admin user'
  );

  console.log(`Supabase seed completed. categories=${categories.length} books=${allBooks.length}`);
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
