import { useEffect, useRef, useState } from 'react';
import DownloadButton from './DownloadButton';
import AccessKeyModal from './AccessKeyModal';

export default function BookSection({ category, books, loading, isAdminMode, onEditBook, onAddBook }) {
  const sectionRef = useRef(null);
  const [selectedLockedBook, setSelectedLockedBook] = useState(null);
  const [unlockedBooks, setUnlockedBooks] = useState(() => {
    // Carregar chaves desbloqueadas do localStorage
    const stored = localStorage.getItem('unlockedBooks');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
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

  const handleUnlock = (bookId, key) => {
    const newUnlocked = { ...unlockedBooks, [bookId]: key };
    setUnlockedBooks(newUnlocked);
    localStorage.setItem('unlockedBooks', JSON.stringify(newUnlocked));
  };

  const isBookUnlocked = (book) => {
    if (!book.locked) return true;
    if (isAdminMode) return true; // Admin vê tudo
    return unlockedBooks[book.id] === book.accessKey;
  };

  if (loading) {
    return (
      <div className="downloads-section animated" ref={sectionRef}>
        <h2><i className={`fas ${category.icon}`}></i> {category.name}</h2>
        <p className="system-info">{category.description}</p>
        <div className="download-container">
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--neon-cyan)' }}>
            Carregando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="downloads-section animated" ref={sectionRef}>
      <div className="section-header-wrapper">
        <div>
          <h2><i className={`fas ${category.icon}`}></i> {category.name}</h2>
          <p className="system-info">{category.description}</p>
        </div>
        {isAdminMode && (
          <button className="btn-add-book" onClick={() => onAddBook(category)}>
            <i className="fas fa-plus"></i> Adicionar Livro
          </button>
        )}
      </div>
      <div className="download-container">
        {books.map((book) => {
          const unlocked = isBookUnlocked(book);
          return (
            <div key={book.id} className="book-item-wrapper">
              <DownloadButton
                icon={book.icon}
                title={book.title}
                url={book.url}
                locked={!unlocked}
                onClick={() => setSelectedLockedBook(book)}
              />
              {isAdminMode && (
                <button
                  className="btn-edit-book"
                  onClick={() => onEditBook(book, category)}
                  title="Editar livro"
                >
                  <i className="fas fa-edit"></i>
                </button>
              )}
            </div>
          );
        })}
      </div>

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
