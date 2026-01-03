import { useEffect, useRef, useState } from 'react';
import { SYSTEM_LEVELS } from '../data/systemLevels';

export default function SystemGrid() {
  const sectionRef = useRef(null);
  const [activeTrail, setActiveTrail] = useState('combatente');

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

  const trails = [
    { id: 'combatente', name: 'COMBATENTE', icon: 'fa-sword' },
    { id: 'especialista', name: 'ESPECIALISTA', icon: 'fa-user-gear' },
    { id: 'ocultista', name: 'OCULTISTA', icon: 'fa-hand-sparkles' }
  ];

  return (
    <div className="downloads-section animated" ref={sectionRef}>
      <h2><i className="fas fa-chart-line"></i> TABELAS DE PROGRESSÃO</h2>
      <p className="system-info">Escolha uma trilha para ver sua tabela de progressão por NEX.</p>

      <div className="trail-tabs">
        {trails.map(trail => (
          <button
            key={trail.id}
            className={`trail-tab ${activeTrail === trail.id ? 'active' : ''}`}
            onClick={() => setActiveTrail(trail.id)}
          >
            <i className={`fas ${trail.icon}`}></i>
            {trail.name}
          </button>
        ))}
      </div>

      <div className="system-table">
        <div className="table-header">
          <div className="header-nex">NEX</div>
          <div className="header-benefit">BENEFÍCIO</div>
        </div>

        <div className="table-body">
          {SYSTEM_LEVELS[activeTrail].map((level, index) => (
            <div key={index} className="table-row">
              <div className="cell-nex">{level.nex}</div>
              <div className="cell-benefit">{level.benefit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
