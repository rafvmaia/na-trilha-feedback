import { Loader2 } from 'lucide-react'; // se usa lucide, senão use qualquer SVG de loading

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex items-center gap-2 text-gray-600 text-lg animate-pulse">
        <Loader2 className="animate-spin w-5 h-5" />
        Carregando...
      </div>
    </div>
  );
}
