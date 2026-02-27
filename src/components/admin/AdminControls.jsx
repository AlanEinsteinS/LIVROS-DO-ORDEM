export default function AdminControls({ onToggleAdmin, isAdminMode }) {
  return (
    <div className="fixed right-4 top-4 z-40 md:right-6 md:top-6">
      <button
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] backdrop-blur transition md:text-sm ${
          isAdminMode
            ? 'border-emerald-300/45 bg-gradient-to-r from-emerald-500/20 to-teal-500/15 text-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,.22)]'
            : 'border-white/15 bg-black/35 text-zinc-100 hover:border-red-300/55 hover:text-red-200'
        }`}
        onClick={onToggleAdmin}
        title={isAdminMode ? 'Desativar modo admin' : 'Ativar modo admin'}
      >
        <i className={`fas ${isAdminMode ? 'fa-lock-open' : 'fa-lock'}`}></i>
        {isAdminMode ? 'Modo Admin' : 'Admin'}
      </button>
    </div>
  );
}
