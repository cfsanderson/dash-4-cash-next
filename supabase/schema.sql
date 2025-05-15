-- Supabase SQL schema for Dash 4 Cash

-- Users (handled by Supabase Auth, but you can extend with profile info)
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  strava_user_id text,
  strava_access_token text,
  strava_refresh_token text,
  strava_token_expires_at timestamp,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Groups
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references users(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Group Members
create table if not exists group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  joined_at timestamp with time zone default timezone('utc'::text, now())
);

-- Dashes
create table if not exists dashes (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  start_date date,
  end_date date,
  type text check (type in ('miles', 'minutes')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Activities
create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  strava_activity_id text,
  distance float,
  duration float,
  start_time timestamp,
  dash_id uuid references dashes(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Donations
create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  group_id uuid references groups(id) on delete cascade,
  amount float,
  charity text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
