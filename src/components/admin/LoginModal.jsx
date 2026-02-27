import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function LoginModal({ onClose, onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (!response.ok || !data?.token) {
        throw new Error(data?.error || 'Email ou senha incorretos!');
      }

      onLogin(data.token);
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao autenticar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg p-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <i className="fas fa-lock text-red-300"></i>
            Acesso Administrativo
          </h2>
          <button className="rounded-lg border border-white/15 px-2 py-1 text-zinc-300 hover:text-white" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
            <p>Digite suas credenciais de administrador.</p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              autoComplete="email"
              placeholder="Digite seu email"
              autoFocus
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:text-white"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl border border-red-400/60 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/30 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Verificando...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Entrar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
