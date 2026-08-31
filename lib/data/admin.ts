import { createClient } from "@/lib/supabase/server";

export interface AlunaResumo {
  id: string;
  email: string;
  nome: string | null;
  criada_em: string;
  ultima_atividade: string | null;
  conteudos_feitos: number;
  conteudos_totais: number;
}

export async function getAlunasComProgresso(): Promise<AlunaResumo[]> {
  const supabase = await createClient();

  // Total de conteúdos publicados
  const { count: totaisRaw } = await supabase
    .from("conteudos")
    .select("*", { count: "exact", head: true });
  const conteudosTotais = totaisRaw ?? 0;

  // Buscar utilizadores da view "alunas_view" (criada no schema)
  const { data: alunas, error } = await supabase
    .from("alunas_view")
    .select("*")
    .order("criada_em", { ascending: false });

  if (error) {
    console.error("getAlunasComProgresso:", error);
    return [];
  }

  return (alunas ?? []).map((a) => ({
    id: a.id,
    email: a.email,
    nome: a.nome,
    criada_em: a.criada_em,
    ultima_atividade: a.ultima_atividade,
    conteudos_feitos: a.conteudos_feitos ?? 0,
    conteudos_totais: conteudosTotais,
  }));
}
