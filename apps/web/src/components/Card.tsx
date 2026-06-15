import React from "react";

/** Card padrão sobre superfície navy (marca Traderisk). */
export function Card({
  titulo,
  children,
  acao,
}: {
  titulo: string;
  children: React.ReactNode;
  acao?: React.ReactNode;
}) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-teal font-semibold text-sm uppercase tracking-wide">{titulo}</p>
        {acao}
      </div>
      {children}
    </div>
  );
}

/** Selo de funcionalidade exclusiva do plano Pro. */
export function ProBadge() {
  return (
    <span className="text-xs font-semibold bg-teal/20 text-teal px-2 py-0.5 rounded-full">
      Pro
    </span>
  );
}

/** Bloco bloqueado para usuários free, com chamada para upgrade. */
export function ProLock({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="blur-sm select-none pointer-events-none opacity-60">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <ProBadge />
        <p className="text-sm text-gray-200 mt-2">Disponível no plano Pro</p>
      </div>
    </div>
  );
}
