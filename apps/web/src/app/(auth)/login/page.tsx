"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const { error } = await createClient().auth.signInWithPassword({
      email,
      password: senha,
    });
    setLoading(false);
    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next || "/consulta");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy to-navy-light text-white grid place-items-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-teal font-semibold text-sm">← TRADERISK ACADEMY</Link>
        <h1 className="text-3xl font-bold mt-4 mb-1">Entrar</h1>
        <p className="text-gray-300 mb-8">Acesse sua conta para destravar o plano Pro.</p>

        <form onSubmit={entrar} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full px-4 py-3 rounded-lg text-navy outline-none"
          />
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-lg text-navy outline-none"
          />
          {erro && <p className="text-red-300 text-sm">{erro}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal hover:bg-teal-light rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-6">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="text-teal font-semibold">Crie grátis</Link>
        </p>
      </div>
    </main>
  );
}
