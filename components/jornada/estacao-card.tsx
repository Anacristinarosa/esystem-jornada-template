import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Estacao } from "@/lib/data/jornada";

interface Props {
  estacao: Estacao;
  conteudosTotais: number;
  conteudosFeitos: number;
}

export function EstacaoCard({ estacao, conteudosTotais, conteudosFeitos }: Props) {
  const completa = conteudosTotais > 0 && conteudosFeitos >= conteudosTotais;
  const progresso = conteudosTotais > 0 ? (conteudosFeitos / conteudosTotais) * 100 : 0;

  return (
    <Link
      href={`/jornada/${estacao.slug}`}
      className="group block rounded-2xl bg-cream-50 gold-border-rich gold-shadow gold-glow-hover p-6 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center gold-shadow",
              completa ? "bg-success" : "bg-gold-foil",
            )}
          >
            {completa ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <MapPin className="w-5 h-5 text-white" />
            )}
          </div>
          <span className="font-serif italic text-2xl gold-text-rich">
            {String(estacao.numero).padStart(2, "0")}
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-gold-500 group-hover:text-gold-600 group-hover:translate-x-0.5 transition-all" />
      </div>

      <h3 className="font-serif italic text-2xl mb-2 gold-text-rich">
        {estacao.nome}
      </h3>
      {estacao.descricao && (
        <p className="text-sm text-ink-soft mb-5 leading-relaxed line-clamp-2">
          {estacao.descricao}
        </p>
      )}

      <div className="flex items-center justify-between mb-1.5 text-[10px] tracking-[0.2em] uppercase">
        <span className={completa ? "text-success" : "text-gold-600"}>
          {completa ? "Concluída" : conteudosFeitos > 0 ? "Em curso" : "Por iniciar"}
        </span>
        <span className="font-serif italic text-base text-gold-700 normal-case tracking-normal">
          {conteudosFeitos}/{conteudosTotais}
        </span>
      </div>
      <div className="h-1.5 bg-gold-50 rounded-full overflow-hidden border border-gold-200">
        <div
          className={cn(
            "h-full transition-all duration-500",
            completa ? "bg-success" : "bg-gold-foil",
          )}
          style={{ width: `${progresso}%` }}
        />
      </div>
    </Link>
  );
}
