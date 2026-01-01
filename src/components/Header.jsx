import { useEffect, useRef } from 'react';

export default function Header() {
  const hackerBgRef = useRef(null);
  const firstWordRef = useRef(null);
  const secondWordRef = useRef(null);

  useEffect(() => {
    // Add cyberpunk effects
    if (hackerBgRef.current) {
      for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = String.fromCharCode(Math.floor(Math.random() * 33) + 65);
        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        span.style.animationDuration = `${Math.random() * 10 + 5}s`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        hackerBgRef.current.appendChild(span);
      }
    }

    // Glitch effects
    const firstGlitch = setInterval(() => {
      if (firstWordRef.current) {
        firstWordRef.current.classList.add('glitch');
        setTimeout(() => {
          firstWordRef.current?.classList.remove('glitch');
        }, 200);
      }
    }, 3000);

    const secondGlitch = setInterval(() => {
      if (secondWordRef.current) {
        secondWordRef.current.classList.add('glitch');
        setTimeout(() => {
          secondWordRef.current?.classList.remove('glitch');
        }, 200);
      }
    }, 4000);

    return () => {
      clearInterval(firstGlitch);
      clearInterval(secondGlitch);
    };
  }, []);

  return (
    <header>
      <div className="scan-lines"></div>
      <div className="cyber-lines"></div>
      <div className="hacker-bg" ref={hackerBgRef}></div>

      <div className="header-container">
        <h1>
          <span className="first-word" ref={firstWordRef}>ORDO</span>
          <span className="second-word" ref={secondWordRef}>REMIER</span>
        </h1>
        <p>Livros/Homebrews <b>atualmente</b> no sistema!</p>
      </div>
      <div className="scan-effect"></div>
    </header>
  );
}
