-- Cittadinanza B1: progresso de cada usuário, salvo como um documento JSON.
-- Execute uma vez no SQL Editor do projeto Supabase.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

-- Cada pessoa só lê e grava o próprio progresso.
drop policy if exists "ler o próprio progresso" on public.progress;
create policy "ler o próprio progresso" on public.progress
  for select using (auth.uid() = user_id);

drop policy if exists "criar o próprio progresso" on public.progress;
create policy "criar o próprio progresso" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "atualizar o próprio progresso" on public.progress;
create policy "atualizar o próprio progresso" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "apagar o próprio progresso" on public.progress;
create policy "apagar o próprio progresso" on public.progress
  for delete using (auth.uid() = user_id);

-- O servidor define a hora da última gravação.
create or replace function public.progress_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists progress_touch on public.progress;
create trigger progress_touch before insert or update on public.progress
  for each row execute function public.progress_touch();
