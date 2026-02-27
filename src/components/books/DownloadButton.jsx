export default function DownloadButton({ icon, title, url, locked, onClick }) {
  const handleClick = (e) => {
    if (locked) {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <a
      href={locked ? '#' : url}
      className={`group book-card ${locked ? 'book-card-locked' : ''}`}
      target={locked ? undefined : '_blank'}
      rel={locked ? undefined : 'noopener noreferrer'}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-300/0 to-zinc-100/0 transition duration-500 group-hover:from-red-500/12 group-hover:via-transparent group-hover:to-zinc-100/10" />
      <div className="absolute -left-24 top-0 h-full w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />

      {locked && (
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-red-300/60 bg-red-500/25 shadow-glow">
          <i className="fas fa-lock text-xs text-red-200"></i>
        </div>
      )}

      <div className="book-icon-wrap">
        <i className={`fas ${icon} text-3xl ${locked ? 'text-zinc-500' : 'text-red-200'}`}></i>
      </div>
      <span className="book-title">{title}</span>
    </a>
  );
}
