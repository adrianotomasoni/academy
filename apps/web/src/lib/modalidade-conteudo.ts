import { createServerSupabase } from "@/lib/supabase-server";

export type ModalidadeVideo = {
  id: string;
  slug: string;
  titulo: string;
  descricao: string | null;
  url: string;
  duracao: string | null;
  ordem: number;
};

export type ModalidadeArquivo = {
  id: string;
  slug: string;
  titulo: string;
  descricao: string | null;
  arquivo_url: string;
  tipo: string;
  tamanho: string | null;
  ordem: number;
};

export type ModalidadeCase = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string | null;
  conteudo: string | null;
  desfecho: string | null;
  ordem: number;
};

export type ConteudoModalidade = {
  videos: ModalidadeVideo[];
  arquivos: ModalidadeArquivo[];
  cases: ModalidadeCase[];
};

/**
 * Busca vídeos, arquivos e cases de uma modalidade no Supabase.
 * Tolerante a falha: se a migration ainda não foi aplicada ou o Supabase não
 * está configurado, retorna listas vazias em vez de quebrar a página.
 * Cases dependem de RLS (somente autenticados) — anônimos recebem [].
 */
export async function getConteudoModalidade(slug: string): Promise<ConteudoModalidade> {
  try {
    const sb = createServerSupabase();
    const [videos, arquivos, cases] = await Promise.all([
      sb.from("modalidade_videos").select("*").eq("slug", slug).order("ordem"),
      sb.from("modalidade_arquivos").select("*").eq("slug", slug).order("ordem"),
      sb.from("modalidade_cases").select("*").eq("slug", slug).order("ordem"),
    ]);
    return {
      videos: (videos.data as ModalidadeVideo[]) ?? [],
      arquivos: (arquivos.data as ModalidadeArquivo[]) ?? [],
      cases: (cases.data as ModalidadeCase[]) ?? [],
    };
  } catch {
    return { videos: [], arquivos: [], cases: [] };
  }
}
