-- ============================================================
-- Schema da plataforma eSystem Jornada
-- Cola no SQL Editor do Supabase e corre uma vez.
-- ============================================================

-- ─────────────── TABELAS ───────────────

-- Estações (blocos maiores da jornada — Módulos, Estações, Programas, o que quiseres)
create table if not exists public.estacoes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  numero integer not null,
  nome text not null,
  descricao text,
  publicada boolean not null default true,
  criada_em timestamptz not null default now()
);

create index if not exists idx_estacoes_numero on public.estacoes(numero);

-- Conteúdos dentro de cada estação (Aulas, Vídeos, Materiais)
create type conteudo_tipo as enum ('video', 'material', 'checkbox');

create table if not exists public.conteudos (
  id uuid primary key default gen_random_uuid(),
  estacao_id uuid not null references public.estacoes(id) on delete cascade,
  numero integer not null,
  titulo text not null,
  descricao text,
  tipo conteudo_tipo not null default 'video',
  vimeo_id text,
  material_url text,
  criado_em timestamptz not null default now()
);

create index if not exists idx_conteudos_estacao on public.conteudos(estacao_id, numero);

-- Progresso das alunas
create table if not exists public.progresso (
  aluna_id uuid not null references auth.users(id) on delete cascade,
  conteudo_id uuid not null references public.conteudos(id) on delete cascade,
  concluido boolean not null default false,
  concluido_em timestamptz,
  atualizado_em timestamptz not null default now(),
  primary key (aluna_id, conteudo_id)
);

create index if not exists idx_progresso_aluna on public.progresso(aluna_id);

-- ─────────────── ROW-LEVEL SECURITY ───────────────

alter table public.estacoes enable row level security;
alter table public.conteudos enable row level security;
alter table public.progresso enable row level security;

-- Estações e conteúdos: qualquer aluna autenticada pode ler
create policy "Alunas autenticadas leem estações"
  on public.estacoes for select
  using (auth.role() = 'authenticated' and publicada = true);

create policy "Alunas autenticadas leem conteúdos"
  on public.conteudos for select
  using (auth.role() = 'authenticated');

-- Progresso: cada aluna só vê e edita o seu próprio
create policy "Cada aluna vê o próprio progresso"
  on public.progresso for select
  using (auth.uid() = aluna_id);

create policy "Cada aluna insere o próprio progresso"
  on public.progresso for insert
  with check (auth.uid() = aluna_id);

create policy "Cada aluna atualiza o próprio progresso"
  on public.progresso for update
  using (auth.uid() = aluna_id)
  with check (auth.uid() = aluna_id);

-- ─────────────── VIEW PARA O PAINEL DA MENTORA ───────────────
-- (a mentora acede como utilizador normal; a proteção é feita
-- no /admin da app via NEXT_PUBLIC_MENTORA_EMAIL)

create or replace view public.alunas_view as
select
  u.id,
  u.email,
  (u.raw_user_meta_data ->> 'nome') as nome,
  u.created_at as criada_em,
  (
    select max(p.atualizado_em) from public.progresso p where p.aluna_id = u.id
  ) as ultima_atividade,
  (
    select count(*) from public.progresso p
    where p.aluna_id = u.id and p.concluido = true
  ) as conteudos_feitos
from auth.users u
order by u.created_at desc;

-- ─────────────── SEED DE EXEMPLO (opcional — apaga se não precisares) ───────────────

insert into public.estacoes (slug, numero, nome, descricao) values
  ('primeira-estacao', 1, 'A primeira estação', 'O primeiro passo da tua jornada. Aqui começas.'),
  ('segunda-estacao', 2, 'A segunda estação', 'Aprofundamento. Aqui aterras.'),
  ('terceira-estacao', 3, 'A terceira estação', 'Consolidação. Aqui integras.')
on conflict (slug) do nothing;

insert into public.conteudos (estacao_id, numero, titulo, descricao, tipo, vimeo_id)
select
  e.id, 1,
  'Vídeo de abertura',
  'Um primeiro contacto com o que vem a seguir.',
  'video'::conteudo_tipo,
  '76979871' -- vídeo demo do Vimeo, substitui pelo teu
from public.estacoes e
where e.slug = 'primeira-estacao'
on conflict do nothing;
