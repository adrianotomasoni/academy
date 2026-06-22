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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
