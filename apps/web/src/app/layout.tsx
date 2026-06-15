import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Traderisk Academy — Inteligência em Seguro Garantia",
  description: "Aprenda, analise e emita Seguro Garantia com a maior plataforma técnica do Brasil. Para corretores, empresas e advogados.",
  metadataBase: new URL("https://academy.traderisk.com.br"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
