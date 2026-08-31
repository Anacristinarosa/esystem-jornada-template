import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { EstacaoCard } from "@/components/jornada/estacao-card";
import { PLATAFORMA } from "@/lib/config";
import { requerUtilizador } from "@/lib/auth";
import {
  getEstacoes,
  getProgressoAluna,
  contarConteudosPorEstacao,
  type Estacao,
} from "@/lib/data/jornada";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "A minha jornada" };

async function contarConteudosFeitosPorEstacao(
  alunaId: string,
  estacoes: Estacao[],
): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("progresso")
    .select("conteudo_id, conteudos!inner(estacao_id)")
    .eq("aluna_id", alunaId)
    .eq("concluido", true);

  const contagem: Record<string, number> = {};
  for (const e of estacoes) contagem[e.id] = 0;
  for (const p of data ?? []) {
    const estacaoId = (p as unknown as { conteudos: { estacao_id: string } }).conteudos
      ?.estacao_id;
    if (estacaoId && contagem[estacaoId] !== undefined) {
      contagem[estacaoId] += 1;
    }
  }
  return contagem;
}

export default async function JornadaPage() {
  const user = await requerUtilizador();
  const estacoes = await getEstacoes();
  const totaisPorEstacao = await contarConteudosPorEstacao();
  const feitosPorEstacao = await contarConteudosFeitosPorEstacao(user.id, estacoes);

  const nomeAluna =
    (user.user_metadata as { nome?: string })?.nome ?? user.email?.split("@")[0] ?? "aluna";

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                Olá, {nomeAluna}
              </p>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl gold-text-rich mb-3">
              A tua jornada
            </h1>
            <p className="text-lg text-ink-soft max-w-2xl leading-relaxed">
              Uma {PLATAFORMA.vocabulario.estacao.toLowerCase()} de cada vez. Ao teu ritmo.
            </p>
          </div>

          {estacoes.length === 0 ? (
            <p className="text-center text-ink-soft py-16">
              As {PLATAFORMA.vocabulario.estacoes.toLowerCase()} vão sendo abertas.
              Volta em breve.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {estacoes.map((estacao) => (
                <EstacaoCard
                  key={estacao.id}
                  estacao={estacao}
                  conteudosTotais={totaisPorEstacao[estacao.id] ?? 0}
                  conteudosFeitos={feitosPorEstacao[estacao.id] ?? 0}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
