import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let nome = user.email ?? "Usuário";
  let plano = "free";
  const { data } = await supabase
    .from("usuarios")
    .select("nome, plano")
    .eq("auth_id", user.id)
    .single();
  if (data) {
    nome = data.nome ?? nome;
    plano = data.plano ?? "free";
  }

  return (
    <div className="min-h-screen flex bg-navy text-white">
      <Sidebar nome={nome} plano={plano} />
      <main className="flex-1 px-8 py-7 overflow-auto">{children}</main>
    </div>
  );
}
