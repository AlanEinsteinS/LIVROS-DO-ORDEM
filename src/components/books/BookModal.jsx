import { useEffect, useState } from 'react';

export default function BookModal({ book, category, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    icon: 'fa-book',
    url: '',
    order: 0,
    locked: false,
    accessKey: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        icon: book.icon,
        url: book.url,
        order: book.order,
        locked: book.locked || false,
        accessKey: ''
      });
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, categoryId: category.id, id: book?.id });
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  const iconOptions = [
    'fa-book',
    'fa-skull',
    'fa-ghost',
    'fa-virus',
    'fa-bolt',
    'fa-biohazard',
    'fa-eye',
    'fa-book-open',
    'fa-hat-wizard',
    'fa-fire',
    'fa-scroll',
    'fa-gem',
    'fa-spider',
    'fa-expand',
    'fa-wand-magic-sparkles',
    'fa-door-open',
    'fa-book-skull',
    'fa-mask',
    'fa-star',
    'fa-file-pdf'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content p-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <i className={`fas ${category.icon} text-red-300`}></i>
            {book ? 'Editar Livro' : 'Adicionar Livro'}
          </h2>
          <button className="rounded-lg border border-white/15 px-2 py-1 text-zinc-300 hover:text-white" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label htmlFor="title" className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400">
              Titulo
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Nome do livro"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
            />
          </div>

          <div>
            <label htmlFor="icon" className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400">
              Icone
            </label>
            <div className="flex items-center gap-3">
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon.replace('fa-', '')}
                  </option>
                ))}
              </select>
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-black/30">
                <i className={`fas ${formData.icon} text-red-300`}></i>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="url" className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              placeholder="https://drive.google.com/..."
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
            />
          </div>

          <div>
            <label htmlFor="order" className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400">
              Ordem
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value, 10) || 0 })}
              min="0"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              id="locked"
              checked={formData.locked}
              onChange={(e) => setFormData({ ...formData, locked: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-black/30"
            />
            <i className="fas fa-lock text-zinc-400"></i>
            Bloquear com chave de acesso
          </label>

          {formData.locked && (
            <div>
              <label htmlFor="accessKey" className="mb-2 block text-xs uppercase tracking-[0.08em] text-zinc-400">
                Chave de Acesso
              </label>
              <input
                type="text"
                id="accessKey"
                value={formData.accessKey}
                onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
                placeholder={book ? 'Deixe vazio para manter a chave atual' : 'Digite uma chave de acesso...'}
                required={!book && formData.locked}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-red-400/60"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 pt-4">
            {book && (
              <button
                type="button"
                className="mr-auto rounded-xl border border-red-500/50 bg-red-500/15 px-4 py-2 text-sm text-red-100 transition hover:bg-red-500/25"
                onClick={handleDelete}
              >
                <i className="fas fa-trash mr-2"></i>
                Deletar
              </button>
            )}
            <button
              type="button"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:text-white"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl border border-red-400/60 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/30"
            >
              <i className="fas fa-save mr-2"></i>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
