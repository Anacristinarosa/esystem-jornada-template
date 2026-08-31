import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ConteudoCard } from "@/components/jornada/conteudo-card";
import { requerUtilizador } from "@/lib/auth";
import {
  getEstacaoPorSlug,
  getConteudosDaEstacao,
  getProgressoAluna,
} from "@/lib/data/jornada";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EstacaoPage({ params }: Props) {
  const { slug } = await params;
  const user = await requerUtilizador();
  const estacao = await getEstacaoPorSlug(slug);
  if (!estacao) notFound();

  const conteudos = await getConteudosDaEstacao(estacao.id);
  const progresso = await getProgressoAluna(user.id);
  const idsFeitos = new Set(
    progresso.filter((p) => p.concluido).map((p) => p.conteudo_id),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/jornada"
            className="inline-flex items-center gap-2 text-sm text-gold-700 hover:text-gold-600 mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar à jornada
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                Estação {String(estacao.numero).padStart(2, "0")}
              </p>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl gold-text-rich mb-3">
              {estacao.nome}
            </h1>
            {estacao.descricao && (
              <p className="text-lg text-ink-soft leading-relaxed whitespace-pre-wrap">
                {estacao.descricao}
              </p>
            )}
          </div>

          {conteudos.length === 0 ? (
            <p className="text-center text-ink-soft py-16">
              Ainda não há conteúdos nesta estação. Volta em breve.
            </p>
          ) : (
            <div className="space-y-5">
              {conteudos.map((c) => (
                <ConteudoCard
                  key={c.id}
                  conteudo={c}
                  concluidoInicial={idsFeitos.has(c.id)}
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
