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

-- Index for fetching standups by date
create index idx_standups_date on standups (date);
create index idx_standup_summaries_date on standup_summaries (date);
