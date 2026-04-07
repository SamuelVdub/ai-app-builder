-- ============================================================
-- KELSTON WAY GREENHOUSE PROJECT HUB
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- PHASES
-- ============================================================
create table if not exists public.phases (
  id         text primary key,
  name       text not null,
  description text,
  start_date date not null,
  end_date   date not null,
  status     text not null default 'not_started'
               check (status in ('not_started','in_progress','complete','at_risk')),
  order_num  int not null,
  created_at timestamptz default now()
);

alter table public.phases enable row level security;
create policy "phases: public read"  on public.phases for select using (true);
create policy "phases: public write" on public.phases for all    using (true);

-- ============================================================
-- TASKS
-- ============================================================
create table if not exists public.tasks (
  id               uuid primary key default uuid_generate_v4(),
  phase_id         text references public.phases(id) on delete cascade,
  title            text not null,
  assignee         text,
  due_date         date,
  status           text not null default 'not_started'
                     check (status in ('not_started','in_progress','complete','at_risk')),
  notes            text,
  is_critical_path boolean default false,
  order_num        int default 0,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

alter table public.tasks enable row level security;
create policy "tasks: public read"  on public.tasks for select using (true);
create policy "tasks: public write" on public.tasks for all    using (true);

-- ============================================================
-- CONTACTS
-- ============================================================
create table if not exists public.contacts (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text,
  phone      text,
  email      text,
  notes      text,
  order_num  int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.contacts enable row level security;
create policy "contacts: public read"  on public.contacts for select using (true);
create policy "contacts: public write" on public.contacts for all    using (true);

-- ============================================================
-- UPDATES  (activity feed)
-- ============================================================
create table if not exists public.updates (
  id         uuid primary key default uuid_generate_v4(),
  message    text not null,
  author     text,
  task_id    uuid references public.tasks(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.updates enable row level security;
create policy "updates: public read"  on public.updates for select using (true);
create policy "updates: public write" on public.updates for all    using (true);
