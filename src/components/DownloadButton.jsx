export default function DownloadButton({ icon, title, url }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a
      href={url}
      className="download-btn"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
    >
      <i className={`fas ${icon}`}></i>
      <span>{title}</span>
    </a>
  );
}
