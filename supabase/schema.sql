create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null,
  url text not null,
  category_id uuid not null references categories(id) on delete cascade,
  "order" integer not null default 0,
  locked boolean not null default false,
  access_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists books_category_id_idx on books(category_id);
create index if not exists books_category_order_idx on books(category_id, "order");

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = public;

drop trigger if exists categories_set_updated_at on categories;
create trigger categories_set_updated_at
before update on categories
for each row execute function update_updated_at_column();

drop trigger if exists books_set_updated_at on books;
create trigger books_set_updated_at
before update on books
for each row execute function update_updated_at_column();

drop trigger if exists users_set_updated_at on users;
create trigger users_set_updated_at
before update on users
for each row execute function update_updated_at_column();

alter table categories enable row level security;
alter table books enable row level security;
alter table users enable row level security;

drop policy if exists categories_public_read on categories;
create policy categories_public_read
on categories
for select
to anon, authenticated
using (true);

drop policy if exists books_public_read on books;
create policy books_public_read
on books
for select
to anon, authenticated
using (true);

drop policy if exists users_no_direct_access on users;
create policy users_no_direct_access
on users
for all
to anon, authenticated
using (false)
with check (false);
