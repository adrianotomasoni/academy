"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const PERFIS = [
  { v: "corretor", l: "Corretor" },
  { v: "tomador", l: "Empresa / tomador" },
  { v: "advogado", l: "Advogado / jurídico" },
];

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("corretor");
  const [erro, setErro] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setMsg("");
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome, perfil } },
    });
    if (error) {
      setLoading(false);
      setErro(error.message);
      return;
    }
    // Cria o perfil estendido (ignora erro se um trigger já cuidar disso).
    if (data.user) {
      await supabase
        .from("usuarios")
        .insert({ auth_id: data.user.id, email, nome, perfil })
        .then(() => {}, () => {});
    }
    setLoading(false);
    if (data.session) {
      router.push("/consulta");
      router.refresh();
    } else {
      setMsg("Conta criada! Confirme seu e-mail para ativar o acesso.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy to-navy-light text-white grid place-items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-teal font-semibold text-sm">← TRADERISK ACADEMY</Link>
        <h1 className="text-3xl font-bold mt-4 mb-1">Crie sua conta grátis</h1>
        <p className="text-gray-300 mb-8">Sem cartão. Consultas básicas ilimitadas.</p>

        <form onSubmit={cadastrar} className="space-y-4">
          <input required value={nome} onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo" className="w-full px-4 py-3 rounded-lg text-navy outline-none" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail" className="w-full px-4 py-3 rounded-lg text-navy outline-none" />
          <input type="password" required minLength={6} value={senha} onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha (mín. 6 caracteres)" className="w-full px-4 py-3 rounded-lg text-navy outline-none" />
          <select value={perfil} onChange={(e) => setPerfil(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-navy outline-none">
            {PERFIS.map((p) => <option key={p.v} value={p.v}>{p.l}</option>)}
          </select>
          {erro && <p className="text-red-300 text-sm">{erro}</p>}
          {msg && <p className="text-teal text-sm">{msg}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-teal hover:bg-teal-light rounded-lg font-bold transition disabled:opacity-50">
            {loading ? "Criando..." : "Criar conta grátis"}
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-6">
          Já tem conta? <Link href="/login" className="text-teal font-semibold">Entrar</Link>
        </p>
      </div>
    </main>
  );
}
