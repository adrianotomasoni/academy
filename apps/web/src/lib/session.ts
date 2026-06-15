"use client";
import { createClient } from "@/lib/supabase";

/** Retorna o access_token da sessão atual (ou undefined se deslogado). */
export async function getToken(): Promise<string | undefined> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token;
}
