import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/** Marca textual Traderisk Academy. */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-display font-bold", className)}>
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-teal-grad text-navy-900 shadow-glow">
        <ShieldCheck size={18} />
      </span>
      <span className="tracking-tight">
        Traderisk <span className="text-teal">Academy</span>
      </span>
    </Link>
  );
}
