import { useState, useEffect } from 'react';

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-700 border-t-red-400" />
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-300">Carregando</p>
      </div>
    </div>
  );
}
