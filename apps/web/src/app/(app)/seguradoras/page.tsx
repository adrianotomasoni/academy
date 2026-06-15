const FILTROS = ["Modalidade: Judicial recursal", "PL: R$ 8 mi", "IS: R$ 2 mi", "Sem RJ"];
const RESULTADO = [
  { n: "Junto Seguros", s: "Aprovável", c: "bg-teal", m: "Dentro da linha de corte para a modalidade" },
  { n: "Pottencial", s: "Aprovável", c: "bg-teal", m: "PL e IS compatíveis" },
  { n: "BMG Seguros", s: "Analisar", c: "bg-yellow-500", m: "IS próxima ao teto — sujeito a análise" },
  { n: "Avla", s: "Fora", c: "bg-red-500/80", m: "Não opera recursal trabalhista neste porte" },
];

export default function Seguradoras() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Guia de seguradoras</h1>
      <p className="text-gray-300 mb-5">Match por perfil do tomador e linhas de corte.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {FILTROS.map((f, i) => (
          <span key={i} className={`text-xs px-3 py-1 rounded-full ${i === 0 ? "bg-teal/20 text-teal" : "bg-white/10 text-gray-300"}`}>{f}</span>
        ))}
      </div>

      <div className="space-y-2">
        {RESULTADO.map((s) => (
          <div key={s.n} className="flex items-center justify-between bg-white/10 border border-white/10 rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">{s.n}</p>
              <p className="text-xs text-gray-300 mt-0.5">{s.m}</p>
            </div>
            <span className={`text-xs font-medium text-white px-3 py-1 rounded-full ${s.c}`}>{s.s}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">Motivos detalhados das linhas de corte são exclusivos do plano Pro.</p>
    </div>
  );
}
