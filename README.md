# eSystem Jornada — Template

Plataforma de formação com login de aluna, área privada e mapa da jornada com estações do teu método. Base para o eSystem tipo "Jornada com Tutora Virtual" do eFounder.

**Stack:** Next.js 15 · Supabase (auth, DB, storage) · Tailwind CSS · TypeScript

## O que vem no template

- **Landing pública** — nome da plataforma + frase-âncora + CTA para login
- **Login e registo** — Supabase Auth com email + password
- **Área da aluna** — mapa da jornada com as estações do teu método
- **Detalhe de cada estação** — vídeos (Vimeo), materiais (PDFs), checkboxes de progresso
- **Painel da mentora** (`/admin`) — lista de alunas, progresso, o que precisa atenção
- **Design creme+dourado** (paleta eFounder por defeito, personalizável)

## Quick start

```bash
npm install
cp .env.example .env.local
# preenche .env.local com os dados do teu projeto Supabase
npm run dev
```

Abre <http://localhost:3000>.

## Setup Supabase

1. Cria projeto novo em [supabase.com](https://supabase.com)
2. Settings → API → copia `Project URL` e `anon public` para `.env.local`
3. SQL Editor → cola e corre o `db/schema.sql`
4. Authentication → Providers → Email → confirma que Email é `enabled`

## Deploy

```bash
vercel deploy --prod
```

E adiciona as env vars no Vercel Dashboard.

---

Criado com a skill `/esystem-jornada` do eFounder.
