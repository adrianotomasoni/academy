import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/cn";

/** Renderiza markdown da base de conhecimento com o estilo .kb. */
export default function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("kb", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
