import { useEffect, useRef, useState } from 'react';
import DownloadButton from './DownloadButton';
import AccessKeyModal from './AccessKeyModal';

const UNLOCK_TTL_MS = 15 * 60 * 1000;

const parseUnlockedBooks = () => {
  try {
    const stored = localStorage.getItem('unlockedBooks');
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') return {};

    const now = Date.now();
    const normalized = {};
    for (const [bookId, value] of Object.entries(parsed)) {
      if (value && typeof value === 'object' && typeof value.expiresAt === 'number' && value.expiresAt > now) {
        normalized[bookId] = value;
      }
    }

    return normalized;
  } catch {
    return {};
  }
};

export default function BookSection({ category, books, loading, isAdminMode, onEditBook, onAddBook }) {
  const sectionRef = useRef(null);
  const [selectedLockedBook, setSelectedLockedBook] = useState(null);
  const [unlockedBooks, setUnlockedBooks] = useState(() => parseUnlockedBooks());
  const [nowTs, setNowTs] = useState(() => Date.now());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem('unlockedBooks', JSON.stringify(unlockedBooks));
  }, [unlockedBooks]);

  useEffect(() => {
    const interval = setInterval(() => setNowTs(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setUnlockedBooks((prev) => {
      const filtered = Object.fromEntries(
        Object.entries(prev).filter(([, value]) => value && typeof value.expiresAt === 'number' && value.expiresAt > nowTs)
      );
      if (Object.keys(filtered).length === Object.keys(prev).length) return prev;
      return filtered;
    });
  }, [nowTs]);

  const handleUnlock = (bookId) => {
    const newUnlocked = {
      ...unlockedBooks,
      [bookId]: {
        unlockedAt: Date.now(),
        expiresAt: Date.now() + UNLOCK_TTL_MS
      }
    };
    setUnlockedBooks(newUnlocked);
  };

  const isBookUnlocked = (book) => {
    if (!book.locked) return true;
    if (isAdminMode) return true;

    const unlockData = unlockedBooks[book.id];
    return Boolean(unlockData && typeof unlockData.expiresAt === 'number' && unlockData.expiresAt > nowTs);
  };

  return (
    <div className="reveal spotlight-panel mb-10 p-6 md:p-8" ref={sectionRef}>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-accent-heading flex items-center gap-3 text-2xl font-bold tracking-wide md:text-3xl">
            <i className={`fas ${category.icon} text-red-300`}></i>
            {category.name}
          </h2>
          <p className="text-subtle-lead mt-2 max-w-3xl text-sm">{category.description}</p>
          <div className="mt-3 h-px w-40 bg-gradient-to-r from-red-300/65 to-transparent" />
        </div>
        {isAdminMode && (
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-red-300/55 bg-gradient-to-r from-red-600/25 to-zinc-950/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-red-100 transition hover:from-red-600/35 hover:to-zinc-900/85"
            onClick={() => onAddBook(category)}
          >
            <i className="fas fa-plus"></i>
            Adicionar Livro
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid place-items-center rounded-xl border border-white/10 bg-black/20 p-12 text-zinc-300">
          <i className="fas fa-spinner fa-spin text-2xl"></i>
          <p className="mt-3 text-sm">Carregando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => {
            const unlocked = isBookUnlocked(book);
            return (
              <div key={book.id} className="relative">
                <DownloadButton
                  icon={book.icon}
                  title={book.title}
                  url={book.url}
                  locked={!unlocked}
                  onClick={() => setSelectedLockedBook(book)}
                />

                {isAdminMode && (
                  <button
                    className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-zinc-200 transition hover:border-red-400/70 hover:text-red-200"
                    onClick={() => onEditBook(book, category)}
                    title="Editar livro"
                  >
                    <i className="fas fa-edit text-xs"></i>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedLockedBook && (
        <AccessKeyModal
          book={selectedLockedBook}
          onClose={() => setSelectedLockedBook(null)}
          onUnlock={handleUnlock}
        />
      )}
    </div>
  );
}
