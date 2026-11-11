-- Cittadino: assinaturas. Só o webhook do Stripe (chave de serviço) grava; cada usuário lê a própria.
create table if not exists public.subscriptions (
  user_id            uuid primary key references auth.users (id) on delete cascade,
  status             text not null,               -- active, trialing, past_due, canceled…
  plan               text,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  updated_at         timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
drop policy if exists "ler a própria assinatura" on public.subscriptions;
create policy "ler a própria assinatura" on public.subscriptions
  for select using (auth.uid() = user_id);
-- Sem políticas de insert/update: só a service_role (Edge Function) consegue gravar.
