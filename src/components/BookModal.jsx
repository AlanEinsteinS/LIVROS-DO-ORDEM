import { useState, useEffect } from 'react';

export default function BookModal({ book, category, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    icon: 'fa-book',
    url: '',
    order: 0
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        icon: book.icon,
        url: book.url,
        order: book.order
      });
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      categoryId: category.id,
      id: book?.id
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  const iconOptions = [
    'fa-book', 'fa-skull', 'fa-ghost', 'fa-virus', 'fa-bolt', 'fa-biohazard',
    'fa-eye', 'fa-book-open', 'fa-hat-wizard', 'fa-fire', 'fa-scroll', 'fa-gem',
    'fa-spider', 'fa-expand', 'fa-wand-magic-sparkles', 'fa-door-open',
    'fa-book-skull', 'fa-mask', 'fa-star', 'fa-file-pdf'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <i className={`fas ${category.icon}`}></i>
            {book ? 'Editar Livro' : 'Adicionar Livro'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">
              <i className="fas fa-heading"></i> Título
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Nome do livro"
            />
          </div>

          <div className="form-group">
            <label htmlFor="icon">
              <i className="fas fa-icons"></i> Ícone
            </label>
            <select
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>
                  {icon.replace('fa-', '')}
                </option>
              ))}
            </select>
            <div className="icon-preview">
              <i className={`fas ${formData.icon}`}></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="url">
              <i className="fas fa-link"></i> URL
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="order">
              <i className="fas fa-sort"></i> Ordem
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              min="0"
            />
          </div>

          <div className="modal-actions">
            {book && (
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
              >
                <i className="fas fa-trash"></i> Deletar
              </button>
            )}
            <button type="button" className="btn-cancel" onClick={onClose}>
              <i className="fas fa-times"></i> Cancelar
            </button>
            <button type="submit" className="btn-save">
              <i className="fas fa-save"></i> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
