"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  LineChart,
  Gavel,
  FileSearch,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase";

const ITENS = [
  { href: "/consulta", label: "Consulta CNPJ", icon: Building2 },
  { href: "/academia", label: "Academia", icon: GraduationCap },
  { href: "/chat", label: "Chat IA", icon: MessageSquare },
  { href: "/seguradoras", label: "Seguradoras", icon: ShieldCheck },
  { href: "/financeiro", label: "Análise financeira", icon: LineChart },
  { href: "/judicial", label: "Pipeline judicial", icon: Gavel },
  { href: "/contratos", label: "Análise de contratos", icon: FileSearch },
];

export default function Sidebar({ nome, plano }: { nome: string; plano: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPro = plano !== "free";

  async function sair() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="w-60 shrink-0 bg-[#0A1830] border-r border-white/10 p-4 flex flex-col">
      <Link href="/" className="flex items-center gap-2 px-2 pb-5">
        <span className="w-7 h-7 rounded-lg bg-teal text-navy font-bold grid place-items-center">T</span>
        <span className="text-sm font-semibold leading-tight">
          Traderisk<br />
          <span className="text-teal text-xs">Academy</span>
        </span>
      </Link>

      <div className="flex-1 space-y-0.5">
        {ITENS.map(({ href, label, icon: Icon }) => {
          const ativo = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                ativo ? "bg-teal/15 text-teal font-medium" : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 px-2 truncate">{nome}</p>
        <div className="px-2 mt-1.5 mb-3">
          <span
            className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
              isPro ? "bg-teal text-navy" : "bg-teal/20 text-teal"
            }`}
          >
            {isPro ? "Plano Pro" : "Plano Free"}
          </span>
        </div>
        <button
          onClick={sair}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 w-full"
        >
          <LogOut size={16} /> Sair
        </button>
      </div>
    </nav>
  );
}
