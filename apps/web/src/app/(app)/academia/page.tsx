const TRILHAS = [
  { t: "Fundamentos", d: "O que é, partes da apólice, sinistro", p: 100 },
  { t: "Modalidades", d: "Judicial, contratual, estruturada, financeira", p: 60 },
  { t: "Análise de editais", d: "Como ler edital e identificar a garantia", p: 20 },
  { t: "Legislação & normas", d: "Lei 14.133, Susep, jurisprudência", p: 0 },
];

export default function Academia() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Academia</h1>
      <p className="text-gray-300 mb-6">Trilhas de conhecimento em Seguro Garantia.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {TRILHAS.map((c) => (
          <div key={c.t} className="bg-white/10 border border-white/10 rounded-xl p-5">
            <p className="font-semibold mb-1">{c.t}</p>
            <p className="text-sm text-gray-300 mb-4">{c.d}</p>
            <div className="h-1.5 bg-white/10 rounded overflow-hidden">
              <div className="h-full bg-teal" style={{ width: `${c.p}%` }} />
            </div>
            <p className="text-xs text-teal mt-2">{c.p}% concluído</p>
          </div>
        ))}
      </div>
    </div>
  );
}
