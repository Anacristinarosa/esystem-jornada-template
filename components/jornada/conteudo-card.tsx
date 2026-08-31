"use client";

import { useState, useTransition } from "react";
import { Check, FileText, Video, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conteudo } from "@/lib/data/jornada";
import { alternarProgresso } from "@/app/jornada/[slug]/actions";

interface Props {
  conteudo: Conteudo;
  concluidoInicial: boolean;
}

export function ConteudoCard({ conteudo, concluidoInicial }: Props) {
  const [concluido, setConcluido] = useState(concluidoInicial);
  const [pendente, startTransition] = useTransition();

  function toggle() {
    const novo = !concluido;
    setConcluido(novo);
    startTransition(async () => {
      try {
        await alternarProgresso(conteudo.id, novo);
      } catch {
        setConcluido(!novo);
      }
    });
  }

  const Icone = conteudo.tipo === "video" ? Video : FileText;

  return (
    <div
      className={cn(
        "rounded-2xl bg-cream-50 gold-border-rich transition-all p-6",
        concluido ? "gold-shadow opacity-90" : "gold-shadow-lg",
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <button
          onClick={toggle}
          disabled={pendente}
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all",
            concluido
              ? "bg-success text-white"
              : "border-2 border-gold-300 text-gold-600 hover:bg-gold-50",
          )}
        >
          {concluido ? <Check className="w-5 h-5" /> : <Icone className="w-5 h-5" />}
        </button>
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-1">
            {conteudo.tipo === "video" ? "Vídeo" : conteudo.tipo === "material" ? "Material" : "Marco"}
          </p>
          <h3
            className={cn(
              "font-serif italic text-xl",
              concluido && "line-through text-ink-faint",
            )}
          >
            {conteudo.titulo}
          </h3>
        </div>
      </div>

      {conteudo.descricao && (
        <p className="text-sm text-ink-soft leading-relaxed mb-4 whitespace-pre-wrap">
          {conteudo.descricao}
        </p>
      )}

      {conteudo.tipo === "video" && conteudo.vimeo_id && (
        <div className="aspect-video rounded-xl overflow-hidden bg-ink mb-4">
          <iframe
            src={`https://player.vimeo.com/video/${conteudo.vimeo_id}?byline=0&portrait=0&title=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {conteudo.tipo === "material" && conteudo.material_url && (
        <a
          href={conteudo.material_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md gold-border-rich text-gold-700 hover:bg-gold-50 text-sm tracking-[0.05em] uppercase font-medium transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Abrir material
        </a>
      )}

      <button
        onClick={toggle}
        disabled={pendente}
        className={cn(
          "mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs tracking-[0.1em] uppercase font-medium transition-all border",
          concluido
            ? "bg-success/10 text-success border-success/30"
            : "text-gold-700 hover:bg-gold-50 border-gold-200",
        )}
      >
        {concluido ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Concluído
          </>
        ) : (
          "Marcar como concluído"
        )}
      </button>
    </div>
  );
}
