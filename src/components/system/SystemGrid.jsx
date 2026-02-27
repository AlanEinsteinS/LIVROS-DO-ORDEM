import { useEffect, useRef, useState } from 'react';
import { SYSTEM_LEVELS } from '../../features/system/data/systemLevels';

export default function SystemGrid() {
  const sectionRef = useRef(null);
  const [activeTrail, setActiveTrail] = useState('combatente');

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

  const trails = [
    { id: 'combatente', name: 'COMBATENTE', icon: 'fa-shield' },
    { id: 'especialista', name: 'ESPECIALISTA', icon: 'fa-user-gear' },
    { id: 'ocultista', name: 'OCULTISTA', icon: 'fa-hand-sparkles' }
  ];

  return (
    <div className="reveal spotlight-panel p-6 md:p-8" ref={sectionRef}>
      <h2 className="text-accent-heading mb-2 flex items-center justify-center gap-3 text-center text-2xl font-bold tracking-wide md:text-3xl">
        <i className="fas fa-chart-line text-red-300"></i>
        TABELAS DE PROGRESSAO
      </h2>
      <p className="text-subtle-lead mb-6 text-center text-sm">Escolha uma trilha para ver sua progressao por NEX.</p>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {trails.map((trail) => (
          <button
            key={trail.id}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition md:text-sm ${
              activeTrail === trail.id
                ? 'border-red-400/60 bg-gradient-to-r from-red-700/35 to-zinc-950/90 text-red-100 shadow-glow'
                : 'border-white/15 bg-black/45 text-zinc-300 hover:border-red-300/35 hover:text-zinc-100'
            }`}
            onClick={() => setActiveTrail(trail.id)}
          >
            <i className={`fas ${trail.icon}`}></i>
            {trail.name}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <div className="grid grid-cols-[88px,1fr] bg-gradient-to-r from-red-700/35 via-red-800/25 to-black/90 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-red-100 md:grid-cols-[120px,1fr] md:text-sm">
          <div>NEX</div>
          <div>Beneficio</div>
        </div>

        <div className="max-h-[560px] overflow-y-auto bg-gradient-to-b from-black/25 via-black/35 to-black/45">
          {SYSTEM_LEVELS[activeTrail].map((level, index) => (
            <div
              key={index}
              className="grid grid-cols-[88px,1fr] border-t border-white/10 bg-black/15 px-4 py-3 text-sm transition hover:bg-red-900/20 md:grid-cols-[120px,1fr]"
            >
              <div className="font-bold text-red-300">{level.nex}</div>
              <div className="text-zinc-200">{level.benefit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
