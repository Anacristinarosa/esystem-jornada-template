import { createClient } from "@/lib/supabase/server";

export interface Estacao {
  id: string;
  slug: string;
  numero: number;
  nome: string;
  descricao: string | null;
  publicada: boolean;
}

export interface Conteudo {
  id: string;
  estacao_id: string;
  numero: number;
  titulo: string;
  descricao: string | null;
  tipo: "video" | "material" | "checkbox";
  vimeo_id: string | null;
  material_url: string | null;
}

export interface ProgressoConteudo {
  conteudo_id: string;
  concluido: boolean;
  concluido_em: string | null;
}

export async function getEstacoes(): Promise<Estacao[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("estacoes")
    .select("*")
    .eq("publicada", true)
    .order("numero", { ascending: true });
  if (error) {
    console.error("getEstacoes:", error);
    return [];
  }
  return data ?? [];
}

export async function getEstacaoPorSlug(slug: string): Promise<Estacao | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("estacoes")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getConteudosDaEstacao(estacaoId: string): Promise<Conteudo[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conteudos")
    .select("*")
    .eq("estacao_id", estacaoId)
    .order("numero", { ascending: true });
  if (error) {
    console.error("getConteudosDaEstacao:", error);
    return [];
  }
  return data ?? [];
}

export async function getProgressoAluna(alunaId: string): Promise<ProgressoConteudo[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("progresso")
    .select("conteudo_id, concluido, concluido_em")
    .eq("aluna_id", alunaId);
  if (error) return [];
  return data ?? [];
}

export async function contarConteudosPorEstacao(): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conteudos")
    .select("estacao_id");
  if (error) return {};
  const contagem: Record<string, number> = {};
  for (const c of data ?? []) {
    contagem[c.estacao_id] = (contagem[c.estacao_id] ?? 0) + 1;
  }
  return contagem;
}
