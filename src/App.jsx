import { useState } from 'react';
import Header from './components/Header';
import TabButton from './components/TabButton';
import BookSection from './components/BookSection';
import SystemGrid from './components/SystemGrid';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LoadingOverlay from './components/LoadingOverlay';
import AdminControls from './components/AdminControls';
import BookModal from './components/BookModal';
import LoginModal from './components/LoginModal';
import { useCategories } from './hooks/useApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [activeTab, setActiveTab] = useState('official');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [modalCategory, setModalCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categories, loading, refetch } = useCategories();

  const tabs = [
    { id: 'official', icon: 'fa-book', label: 'Livros Oficiais' },
    { id: 'homebrew', icon: 'fa-flask', label: 'Homebrews / Não Oficiais' },
    { id: 'passage', icon: 'fa-door-open', label: 'A Passagem' },
    { id: 'system', icon: 'fa-table', label: 'Tabela Global' }
  ];

  const getCategoryBySlug = (slug) => {
    return categories.find(cat => cat.slug === slug);
  };

  const handleToggleAdmin = () => {
    if (!isAdminMode && !isAuthenticated) {
      // Tentar ativar admin sem estar autenticado
      setShowLoginModal(true);
    } else if (isAdminMode && isAuthenticated) {
      // Desativar modo admin (logout)
      setIsAdminMode(false);
      setIsAuthenticated(false);
    }
  };

  const handleLoginSuccess = () => {
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

  const handleSaveBook = async (bookData) => {
    try {
      const method = bookData.id ? 'PUT' : 'POST';
      const url = bookData.id
        ? `${API_URL}/books/${bookData.id}`
        : `${API_URL}/books`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      });

      if (!response.ok) throw new Error('Failed to save book');

      await refetch();
      handleCloseModal();
      alert(bookData.id ? 'Livro atualizado com sucesso!' : 'Livro adicionado com sucesso!');
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Erro ao salvar livro. Tente novamente.');
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete book');

      await refetch();
      handleCloseModal();
      alert('Livro deletado com sucesso!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Erro ao deletar livro. Tente novamente.');
    }
  };

  return (
    <>
      <LoadingOverlay />
      <Header />

      <main>
        <AdminControls
          isAdminMode={isAdminMode}
          onToggleAdmin={handleToggleAdmin}
        />

        <div className="tabs">
          {tabs.map(tab => (
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

        {activeTab !== 'system' && (
          <>
            {['official', 'homebrew', 'passage'].map(slug => (
              <section key={slug} className={`tab-content ${activeTab === slug ? 'active' : ''}`}>
                {getCategoryBySlug(slug) && (
                  <BookSection
                    category={getCategoryBySlug(slug)}
                    books={getCategoryBySlug(slug).books || []}
                    loading={loading}
                    isAdminMode={isAdminMode}
                    onEditBook={handleEditBook}
                    onAddBook={handleAddBook}
                  />
                )}
              </section>
            ))}
          </>
        )}

        <section className={`tab-content ${activeTab === 'system' ? 'active' : ''}`}>
          <SystemGrid />
        </section>
      </main>

      <Footer />
      <BackToTop />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginSuccess}
        />
      )}

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
