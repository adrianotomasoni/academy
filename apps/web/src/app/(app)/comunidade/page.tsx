import { MessageCircle, ThumbsUp, BookOpen, Sparkles } from "lucide-react";

const FEED = [
  {
    autor: "Marina C.",
    inicial: "M",
    contexto: "comentou em Depósito recursal trabalhista",
    texto: "Dica: peça sempre a certidão de objeto e pé antes de cotar — evita surpresa com processo já encerrado.",
    likes: 12,
    respostas: 4,
  },
  {
    autor: "Rafael T.",
    inicial: "R",
    contexto: "comentou no blog · “Lei 14.133 e o Seguro Garantia”",
    texto: "O aumento do percentual de garantia em obras de grande vulto mudou bastante a originação. Alguém já sentiu no funil?",
    likes: 8,
    respostas: 6,
  },
  {
    autor: "Júlia M.",
    inicial: "J",
    contexto: "comentou em Concessões públicas",
    texto: "Completion bond + performance na mesma operação: como vocês estruturam o cosseguro acima de 200M?",
    likes: 15,
    respostas: 9,
  },
];

export default function Comunidade() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-2xl font-bold">Comunidade</h1>
        <span className="text-xs font-medium bg-teal/20 text-teal px-2.5 py-0.5 rounded-full">prévia</span>
      </div>
      <p className="text-gray-300 mb-6">
        A rede dos corretores de Seguro Garantia — comente em modalidades e em matérias do blog, troque experiências e tire dúvidas.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-teal/20 text-teal grid place-items-center font-semibold">você</div>
        <input
          disabled
          placeholder="Compartilhe uma experiência ou pergunte à comunidade…"
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-gray-300 placeholder:text-gray-400 outline-none cursor-not-allowed"
        />
      </div>

      <div className="space-y-3">
        {FEED.map((p, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-teal/20 text-teal grid place-items-center font-semibold">{p.inicial}</div>
              <div>
                <p className="font-medium text-sm">{p.autor}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  {p.contexto.includes("blog") ? <BookOpen size={12} /> : <Sparkles size={12} />}
                  {p.contexto}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-200 mb-3">{p.texto}</p>
            <div className="flex items-center gap-5 text-xs text-gray-400">
              <span className="flex items-center gap-1"><ThumbsUp size={14} /> {p.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle size={14} /> {p.respostas} respostas</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-8">
        Prévia da experiência. O backend social (posts, comentários, curtidas) entra na próxima fase.
      </p>
    </div>
  );
}
