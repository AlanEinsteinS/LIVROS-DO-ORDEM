export default function DownloadButton({ icon, title, url, locked, onClick }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleClick = (e) => {
    if (locked) {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <a
      href={locked ? '#' : url}
      className={`download-btn ${locked ? 'locked' : ''}`}
      target={locked ? undefined : "_blank"}
      rel={locked ? undefined : "noopener noreferrer"}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {locked && (
        <div className="lock-overlay">
          <i className="fas fa-lock"></i>
        </div>
      )}
      <i className={`fas ${icon}`}></i>
      <span>{title}</span>
    </a>
  );
}
