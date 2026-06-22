import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Modalidade } from "@/lib/modalidades";
import { GRUPOS } from "@/lib/modalidades";
import { GRUPO_UI } from "@/components/ui/grupo";
import { cn } from "@/lib/cn";

/** Card de modalidade (didático, cor por grupo) para grades. */
export default function ModalidadeCard({ m }: { m: Modalidade }) {
  const accent = GRUPOS[m.grupo].accent;
  const ui = GRUPO_UI[accent];
  const Icon = ui.Icon;

  return (
    <Link
      href={`/modalidades/${m.slug}`}
      className={cn("group card-surface card-hover p-5 flex flex-col animate-fade-up")}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={cn("grid place-items-center w-10 h-10 rounded-xl", ui.bgSoft, ui.text)}>
          <Icon size={20} />
        </span>
        <span className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-full", ui.chip)}>
          {GRUPOS[m.grupo].label}
        </span>
      </div>
      <p className="font-display font-semibold text-[15px] mb-1.5 group-hover:text-teal transition">
        {m.nome}
      </p>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{m.resumo}</p>
      <span className={cn("mt-auto text-sm flex items-center gap-1 font-medium", ui.text)}>
        Abrir página <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
      </span>
    </Link>
  );
}
