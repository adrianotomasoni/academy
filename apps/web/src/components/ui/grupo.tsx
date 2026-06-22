import { Scale, Gavel, Layers, Landmark, type LucideIcon } from "lucide-react";
import type { GrupoAccent } from "@/lib/modalidades";

type GrupoStyle = {
  Icon: LucideIcon;
  text: string;
  bgSoft: string;
  chip: string;
  hoverBorder: string;
  dot: string;
  glow: string;
};

/**
 * Estilos por grupo (cor + ícone) — didática por cor.
 * Classes escritas por extenso para o Tailwind JIT detectá-las.
 */
export const GRUPO_UI: Record<GrupoAccent, GrupoStyle> = {
  tradicional: {
    Icon: Scale,
    text: "text-teal",
    bgSoft: "bg-teal/10",
    chip: "bg-teal/15 text-teal",
    hoverBorder: "group-hover:border-teal/50",
    dot: "bg-teal",
    glow: "shadow-[0_0_40px_-12px_rgba(0,201,177,0.5)]",
  },
  judicial: {
    Icon: Gavel,
    text: "text-grupo-judicial",
    bgSoft: "bg-grupo-judicial/10",
    chip: "bg-grupo-judicial/15 text-grupo-judicial",
    hoverBorder: "group-hover:border-grupo-judicial/50",
    dot: "bg-grupo-judicial",
    glow: "shadow-[0_0_40px_-12px_rgba(91,157,249,0.5)]",
  },
  estruturada: {
    Icon: Layers,
    text: "text-grupo-estruturada",
    bgSoft: "bg-grupo-estruturada/10",
    chip: "bg-grupo-estruturada/15 text-grupo-estruturada",
    hoverBorder: "group-hover:border-grupo-estruturada/50",
    dot: "bg-grupo-estruturada",
    glow: "shadow-[0_0_40px_-12px_rgba(167,139,250,0.5)]",
  },
  financeira: {
    Icon: Landmark,
    text: "text-grupo-financeira",
    bgSoft: "bg-grupo-financeira/10",
    chip: "bg-grupo-financeira/15 text-grupo-financeira",
    hoverBorder: "group-hover:border-grupo-financeira/50",
    dot: "bg-grupo-financeira",
    glow: "shadow-[0_0_40px_-12px_rgba(245,181,68,0.5)]",
  },
};
