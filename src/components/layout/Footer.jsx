export default function Footer() {
  return (
    <footer className="mx-auto mt-14 w-full max-w-7xl px-4 pb-10 md:px-8">
      <div className="spotlight-panel flex flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-300 md:flex-row">
        <p className="flex items-center gap-2">
          <span>&copy; 2026</span>
          <span className="text-zinc-500">|</span>
          <span>Desenvolvido por alan</span>
          <i className="fas fa-code text-red-400"></i>
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/DYmwj6yvYN"
            className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:border-red-400/60 hover:text-red-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-discord"></i>
          </a>
          <a
            href="https://github.com/AlanEinsteinS"
            className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:border-red-400/60 hover:text-red-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.instagram.com/darkudassos/"
            className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:border-red-400/60 hover:text-red-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
