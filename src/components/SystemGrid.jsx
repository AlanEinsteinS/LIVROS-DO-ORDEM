import { useEffect, useRef } from 'react';
import { useSystemLevels } from '../hooks/useApi';

export default function SystemGrid() {
  const sectionRef = useRef(null);
  const { levels, loading } = useSystemLevels();

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

  return (
    <div className="downloads-section animated" ref={sectionRef}>
      <h2><i className="fas fa-chart-line"></i> TABELA GLOBAL</h2>
      <p className="system-info">Aqui está a tabela global para qualquer classe no sistema.</p>
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--neon-cyan)' }}>
          Carregando...
        </div>
      ) : (
        <div className="system-grid">
          {levels.map((levelData) => {
            const percentageText = `${levelData.percentage}% / ${levelData.level}`;

            return (
              <div key={levelData.id} className="grid-item">
                <div className="percentage">{percentageText}</div>
                <div className="description">{levelData.description}</div>
                <div className="cyber-line"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
