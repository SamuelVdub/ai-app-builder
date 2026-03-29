-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- Auto-created on user signup via trigger
-- ============================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: owner can read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: owner can update own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Public read for share page
create policy "profiles: public can read"
  on public.profiles for select
  using (true);

-- Trigger: insert profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  generated_username text;
begin
  generated_username := coalesce(
    split_part(new.email, '@', 1),
    substr(new.id::text, 1, 8)
  );
  -- ensure uniqueness by appending random suffix if needed
  while exists (select 1 from public.profiles where username = generated_username) loop
    generated_username := generated_username || substr(md5(random()::text), 1, 4);
  end loop;
  insert into public.profiles (id, username)
  values (new.id, generated_username);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- USER_SERVICES
-- ============================================================
create table if not exists public.user_services (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  service_id  text not null,
  connected   boolean not null default false,
  updated_at  timestamptz not null default now(),
  unique (user_id, service_id)
);

alter table public.user_services enable row level security;

create policy "user_services: owner full access"
  on public.user_services for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_services: public read"
  on public.user_services for select
  using (true);

-- ============================================================
-- ONBOARDING_PROGRESS
-- ============================================================
create table if not exists public.onboarding_progress (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  step_id      text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, step_id)
);

alter table public.onboarding_progress enable row level security;

create policy "onboarding: owner full access"
  on public.onboarding_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "onboarding: public read"
  on public.onboarding_progress for select
  using (true);

-- ============================================================
-- CUSTOM_SERVICES
-- ============================================================
create table if not exists public.custom_services (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  url         text not null,
  description text,
  created_at  timestamptz not null default now()
);

alter table public.custom_services enable row level security;

create policy "custom_services: owner full access"
  on public.custom_services for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "custom_services: public read"
  on public.custom_services for select
  using (true);
