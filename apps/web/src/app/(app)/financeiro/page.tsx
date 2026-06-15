const METRICAS = [
  { l: "Patrimônio líquido", v: "R$ 8,2 mi" },
  { l: "Liquidez corrente", v: "1,8" },
  { l: "Endividamento", v: "42%" },
];

export default function Financeiro() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Análise financeira</h1>
      <p className="text-gray-300 mb-6">Indicadores e capacidade de garantia estimada.</p>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {METRICAS.map((m) => (
          <div key={m.l} className="bg-white/5 rounded-lg p-4">
            <p className="text-xs text-gray-300">{m.l}</p>
            <p className="text-2xl font-semibold mt-1">{m.v}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/10 border border-white/10 rounded-xl p-5">
        <p className="text-teal font-semibold text-sm uppercase tracking-wide mb-3">Capacidade de garantia estimada</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-teal">R$ 24,6 mi</span>
          <span className="text-sm text-gray-300">≈ 3× o PL</span>
        </div>
        <div className="h-2 bg-white/10 rounded mt-3 overflow-hidden">
          <div className="h-full bg-teal" style={{ width: "34%" }} />
        </div>
        <p className="text-xs text-gray-300 mt-1.5">R$ 8,4 mi já comprometidos em apólices vigentes (34%)</p>
      </div>
    </div>
  );
}
