import { useState } from 'react';

export default function AccessKeyModal({ book, onClose, onUnlock }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular verificação (300ms)
    setTimeout(() => {
      if (key.trim() === book.accessKey) {
        // Chave correta
        onUnlock(book.id, key);
        onClose();
      } else {
        setError('Chave de acesso inválida!');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content access-key-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-header">
          <i className="fas fa-lock" style={{ fontSize: '3rem', color: 'var(--blood-red)' }}></i>
          <h2>Conteúdo Bloqueado</h2>
          <p className="locked-book-title">{book.title}</p>
        </div>

        <div className="modal-body">
          <p className="access-key-info">
            Este conteúdo requer uma chave de acesso especial.
            <br />
            Digite a chave para desbloquear.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="accessKey">
                <i className="fas fa-key"></i> Chave de Acesso
              </label>
              <input
                type="text"
                id="accessKey"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Digite a chave de acesso..."
                autoFocus
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || !key.trim()}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Verificando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-unlock"></i> Desbloquear
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
