-- Standup entries from team members
create table standups (
  id uuid primary key default gen_random_uuid(),
  dev_name text not null,
  yesterday text not null,
  today text not null,
  blocker text,
  ai_assist text,
  date date not null default current_date,
  created_at timestamptz not null default now()
);

-- AI-generated standup summaries
create table standup_summaries (
  id uuid primary key default gen_random_uuid(),
  summary text not null,
  date date not null default current_date,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_standups_date on standups (date);
create index idx_standup_summaries_date on standup_summaries (date);

-- Enable RLS
alter table standups enable row level security;
alter table standup_summaries enable row level security;

-- RLS policies: authenticated users can read and insert
create policy "Authenticated users can read standups"
  on standups for select
  to authenticated
  using (true);

create policy "Authenticated users can insert standups"
  on standups for insert
  to authenticated
  with check (true);

create policy "Authenticated users can read standup_summaries"
  on standup_summaries for select
  to authenticated
  using (true);

create policy "Authenticated users can insert standup_summaries"
  on standup_summaries for insert
  to authenticated
  with check (true);
