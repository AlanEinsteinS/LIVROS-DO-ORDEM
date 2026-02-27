import { useState } from 'react';
import Header from './components/layout/Header';
import TabButton from './components/navigation/TabButton';
import BookSection from './components/books/BookSection';
import SystemGrid from './components/system/SystemGrid';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import LoadingOverlay from './components/layout/LoadingOverlay';
import AdminControls from './components/admin/AdminControls';
import BookModal from './components/books/BookModal';
import LoginModal from './components/admin/LoginModal';
import BackgroundBeams from './components/ui/BackgroundBeams';
import { useCategories } from './services/api/useApi';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [activeTab, setActiveTab] = useState('official');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [modalCategory, setModalCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categories, loading, refetch } = useCategories();

  const tabs = [
    { id: 'official', icon: 'fa-book', label: 'Livros Oficiais' },
    { id: 'homebrew', icon: 'fa-flask', label: 'Homebrews / Nao Oficiais' },
    { id: 'passage', icon: 'fa-door-open', label: 'A Passagem' },
    { id: 'system', icon: 'fa-table', label: 'Tabela Global' }
  ];

  const getCategoryBySlug = (slug) => categories.find((cat) => cat.slug === slug);

  const handleToggleAdmin = () => {
    if (!isAdminMode && !isAuthenticated) {
      setShowLoginModal(true);
    } else if (isAdminMode && isAuthenticated) {
      setIsAdminMode(false);
      setIsAuthenticated(false);
      setAdminToken('');
    }
  };

  const handleLoginSuccess = (token) => {
    setAdminToken(token);
    setIsAuthenticated(true);
    setIsAdminMode(true);
    setShowLoginModal(false);
  };

  const handleEditBook = (book, category) => {
    setModalBook(book);
    setModalCategory(category);
    setIsModalOpen(true);
  };

  const handleAddBook = (category) => {
    setModalBook(null);
    setModalCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalBook(null);
    setModalCategory(null);
  };

  const getAdminHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${adminToken}`
  });

  const handleSaveBook = async (bookData) => {
    try {
      const method = bookData.id ? 'PUT' : 'POST';
      const url = bookData.id ? `${API_URL}/books/${bookData.id}` : `${API_URL}/books`;

      const response = await fetch(url, {
        method,
        headers: getAdminHeaders(),
        body: JSON.stringify(bookData)
      });

      if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false);
        setIsAdminMode(false);
        setAdminToken('');
        throw new Error('Sessao expirada. Faca login novamente.');
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to save book');
      }

      await refetch();
      handleCloseModal();
      alert(bookData.id ? 'Livro atualizado com sucesso!' : 'Livro adicionado com sucesso!');
    } catch (error) {
      console.error('Error saving book:', error);
      alert(error.message || 'Erro ao salvar livro. Tente novamente.');
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false);
        setIsAdminMode(false);
        setAdminToken('');
        throw new Error('Sessao expirada. Faca login novamente.');
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to delete book');
      }

      await refetch();
      handleCloseModal();
      alert('Livro deletado com sucesso!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert(error.message || 'Erro ao deletar livro. Tente novamente.');
    }
  };

  return (
    <>
      <BackgroundBeams />
      <LoadingOverlay />
      <Header />

      <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <AdminControls isAdminMode={isAdminMode} onToggleAdmin={handleToggleAdmin} />

        <div className="fancy-border mx-auto mb-8 w-full max-w-4xl">
          <div className="fancy-border-inner flex flex-wrap justify-center gap-2 p-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                tabId={tab.id}
                activeTab={activeTab}
                onClick={setActiveTab}
              />
            ))}
          </div>
        </div>

        {activeTab !== 'system' &&
          ['official', 'homebrew', 'passage'].map((slug) => {
            const category = getCategoryBySlug(slug);
            if (!category) return null;
            return (
              <section key={slug} className={activeTab === slug ? 'block' : 'hidden'}>
                <BookSection
                  category={category}
                  books={category.books || []}
                  loading={loading}
                  isAdminMode={isAdminMode}
                  onEditBook={handleEditBook}
                  onAddBook={handleAddBook}
                />
              </section>
            );
          })}

        <section className={activeTab === 'system' ? 'block' : 'hidden'}>
          <SystemGrid />
        </section>
      </main>

      <Footer />
      <BackToTop />

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} />}

      {isModalOpen && (
        <BookModal
          book={modalBook}
          category={modalCategory}
          onClose={handleCloseModal}
          onSave={handleSaveBook}
          onDelete={handleDeleteBook}
        />
      )}
    </>
  );
}

export default App;
