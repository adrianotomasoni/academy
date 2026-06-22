import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-navy-900 hover:bg-teal-light shadow-[0_8px_24px_-8px_rgba(0,166,147,0.6)]",
  secondary: "border border-white/20 text-white hover:border-teal hover:text-teal",
  ghost: "text-gray-300 hover:text-teal",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps &
  ({ href: string } | { href?: undefined }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
