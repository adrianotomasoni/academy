import { PlayCircle } from "lucide-react";

/** Player responsivo (16:9). Sem URL, mostra um placeholder elegante. */
export default function VideoEmbed({ url, titulo }: { url?: string; titulo: string }) {
  if (!url) {
    return (
      <div className="aspect-video card-surface grid place-items-center">
        <div className="text-center px-6">
          <PlayCircle className="text-teal mx-auto mb-2" size={46} />
          <p className="text-sm text-gray-400">Vídeo-aula em breve — {titulo}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
      <iframe
        src={url}
        title={titulo}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
