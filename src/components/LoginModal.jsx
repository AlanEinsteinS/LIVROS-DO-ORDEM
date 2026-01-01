import { useState } from 'react';

export default function LoginModal({ onClose, onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Credenciais hard-coded
    const validUsername = 'admin';
    const validPassword = 'alan2458';

    setTimeout(() => {
      if (credentials.username === validUsername && credentials.password === validPassword) {
        onLogin();
        onClose();
      } else {
        setError('Usuário ou senha incorretos!');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="modal-overlay login-modal-overlay" onClick={onClose}>
      <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <i className="fas fa-lock"></i>
            Acesso Administrativo
          </h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form login-form">
          <div className="login-info">
            <i className="fas fa-shield-alt"></i>
            <p>Digite suas credenciais de administrador</p>
          </div>

          {error && (
            <div className="login-error">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i> Usuário
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              autoComplete="username"
              placeholder="Digite seu usuário"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-key"></i> Senha
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
            />
          </div>

          <div className="modal-actions login-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              <i className="fas fa-times"></i> Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Verificando...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Entrar
                </>
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            <i className="fas fa-info-circle"></i>
            Acesso restrito a administradores
          </p>
        </div>
      </div>
    </div>
  );
}
