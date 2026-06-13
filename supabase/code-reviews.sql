-- AI code review results
create table code_reviews (
  id uuid primary key default gen_random_uuid(),
  pr_number integer not null,
  file_name text not null,
  score integer not null,
  approved boolean not null default false,
  review_json jsonb,
  created_at timestamptz not null default now()
);

-- Index for fetching recent reviews
create index idx_code_reviews_created_at on code_reviews (created_at);

-- Enable RLS
alter table code_reviews enable row level security;

-- RLS policies: authenticated users can read and insert
create policy "Authenticated users can read code_reviews"
  on code_reviews for select
  to authenticated
  using (true);

create policy "Authenticated users can insert code_reviews"
  on code_reviews for insert
  to authenticated
  with check (true);
