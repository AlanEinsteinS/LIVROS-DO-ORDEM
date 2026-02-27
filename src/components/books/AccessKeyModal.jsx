import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function AccessKeyModal({ book, onClose, onUnlock }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/books/${book.id}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key.trim() })
      });

      const data = await response.json();
      if (!response.ok || !data?.unlocked) {
        throw new Error(data?.error || 'Chave de acesso invalida!');
      }

      onUnlock(book.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao validar chave');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-xl p-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Conteudo Bloqueado</h2>
            <p className="mt-1 text-sm text-zinc-400">{book.title}</p>
          </div>
          <button className="rounded-lg border border-white/15 px-2 py-1 text-zinc-300 hover:text-white" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-zinc-200">
            Este conteudo requer uma chave de acesso especial.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="accessKey" className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400">
                Chave de Acesso
              </label>
              <input
                type="text"
                id="accessKey"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Digite a chave de acesso..."
                autoFocus
                disabled={isLoading}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:text-white"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl border border-red-400/60 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/30 disabled:opacity-50"
                disabled={isLoading || !key.trim()}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Verificando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-unlock mr-2"></i>
                    Desbloquear
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
