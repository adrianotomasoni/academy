const OPORTUNIDADES = [
  { e: "Construtora Alfa Ltda", o: "Depósito recursal trabalhista", v: "R$ 480 mil", s: "Novo", c: "bg-teal" },
  { e: "Engebras Engenharia", o: "Penhora — substituição por seguro", v: "R$ 1,2 mi", s: "Quente", c: "bg-yellow-500" },
  { e: "Rodovias União S.A.", o: "Garantia de execução fiscal", v: "R$ 3,5 mi", s: "Contatado", c: "bg-blue-500" },
];

export default function Judicial() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Pipeline judicial</h1>
      <p className="text-gray-300 mb-5">Oportunidades monitoradas via DataJud e Escavador.</p>

      <div className="space-y-2">
        {OPORTUNIDADES.map((o) => (
          <div key={o.e} className="flex items-center justify-between bg-white/10 border border-white/10 rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">{o.e}</p>
              <p className="text-xs text-gray-300 mt-0.5">{o.o}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-teal text-sm">{o.v}</p>
              <span className={`text-xs font-medium text-white px-2.5 py-0.5 rounded-full ${o.c}`}>{o.s}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
