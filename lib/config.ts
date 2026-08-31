// ============================================================
// CONFIGURAÇÃO DA TUA PLATAFORMA
// ------------------------------------------------------------
// A skill /esystem-jornada preenche isto a partir do teu
// 'eSystem — Desenho (v1).md'. Podes editar à mão depois.
// ============================================================

export const PLATAFORMA = {
  /** Nome que aparece no topo e no separador do browser */
  nome: "eSystem",

  /** Iniciais (1-3 letras) para o logo pequeno */
  iniciais: "eS",

  /** Frase-âncora do primeiro ecrã — 1 linha na tua voz */
  fraseAncora:
    "A tua transformação, com sistema por baixo.",

  /** Subtítulo curto que aparece por baixo da frase-âncora na landing */
  subtitulo:
    "Um método próprio, uma jornada guiada, uma comunidade de founders.",

  /** Nome de quem tu és — a mentora atrás da plataforma */
  mentora: {
    nome: "A Mentora",
    email: "tu@teudominio.pt",
  },

  /** Vocabulário que usas para os blocos da tua jornada. */
  vocabulario: {
    /** Nome plural do nível 1 — ex: "Módulos", "Estações", "Blocos", "Programas" */
    estacoes: "Estações",
    estacao: "Estação",
    /** Nome plural do nível 2 (o conteúdo dentro) — ex: "Aulas", "Vídeos", "Desafios" */
    conteudos: "Aulas",
    conteudo: "Aula",
  },
} as const;
