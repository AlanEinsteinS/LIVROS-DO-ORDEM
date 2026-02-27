import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-100 shadow-glow backdrop-blur transition ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      aria-label="Voltar ao topo"
    >
      <i className="fas fa-arrow-up text-sm"></i>
    </a>
  );
}
