function addCyberpunkEffects() {
    const hackerBg = document.querySelector('.hacker-bg');
    if (hackerBg) {
      for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = String.fromCharCode(Math.floor(Math.random() * 33) + 65);
        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        span.style.animationDuration = `${Math.random() * 10 + 5}s`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        hackerBg.appendChild(span);
      }
    }
    
    const firstWord = document.querySelector('header h1 .first-word');
    const secondWord = document.querySelector('header h1 .second-word');
    
    if (firstWord && secondWord) {
      setInterval(() => {
        firstWord.classList.add('glitch');
        setTimeout(() => {
          firstWord.classList.remove('glitch');
        }, 200);
      }, 3000);
      
      setInterval(() => {
        secondWord.classList.add('glitch');
        setTimeout(() => {
          secondWord.classList.remove('glitch');
        }, 200);
      }, 4000);
    }
  }
  
  function setupTabEvents() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.classList.contains("active")) return;
        
        tabButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        
        document.querySelectorAll(".tab-content").forEach(tab => {
          tab.classList.remove("active");
        });
        
        const targetTabId = button.dataset.tab;
        const targetTab = document.getElementById(targetTabId);
        
        if (targetTab) {
          targetTab.classList.add("active");
        }
      });
    });
  }
  
  function generateSystemGrid() {
    const gridContainer = document.getElementById("system-grid");
    if (!gridContainer) return;
    
    const descriptions = [
      "1° Est. de Combate | Hab. de Classe | Poder Geral",
      "Poder de Classe",
      "1° Poder da Trilha | Poder de Combate",
      "Poder de Classe | Ponto de Atributo",
      "Poder Geral e Paranormal | Upzinho na Hab. de Classe",
      "Poder de Classe e Combate",
      "Grau de Treinamento",
      "Poder de Classe e Paranormal",
      "2° Poder da Trilha",
      "Versatilidade | Poder Geral, Classe | Afinidade/Clausura | 1 Pt. Atributo",
      "Upzinho da Habilidade de Classe | Poder Paranormal",
      "Poder de Classe e Combate",
      "3° Poder da Trilha",
      "Poder de Classe e Paranormal",
      "Grau de Treinamento | Poder Geral, Classe | 2° Est.",
      "4° Poder de Trilha ou 1 Buffzin | Poder de Classe",
      "Upzinho da Habilidade de Classe | Poder Paranormal",
      "Poder de Classe",
      "Ponto de Atributo",
      "5°/4° Poder de Trilha | Poder de Classe, Geral, Combate e Paranormal"
    ];
  
    gridContainer.innerHTML = '';
  
    for (let i = 1; i <= 20; i++) {
      const percentage = i * 5;
      const count = i;
      
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      
      const percentageText = (i === 20) ? `99% / ${count}` : `${percentage}% / ${count}`;
      
      const percentageDiv = document.createElement("div");
      percentageDiv.className = "percentage";
      percentageDiv.textContent = percentageText;
      
      const descriptionDiv = document.createElement("div");
      descriptionDiv.className = "description";
      descriptionDiv.textContent = descriptions[i - 1] || `Nível ${i}`;
      
      const cyberLine = document.createElement("div");
      cyberLine.className = "cyber-line";
      
      gridItem.appendChild(percentageDiv);
      gridItem.appendChild(descriptionDiv);
      gridItem.appendChild(cyberLine);
      
      gridContainer.appendChild(gridItem);
    }
  }
  
  function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  function setupScrollObserver() {
    const animatedElements = document.querySelectorAll('.animated');
    
    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach(el => {
        el.classList.add('show');
      });
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  function showPreloader() {
    const preloader = document.querySelector('.loading-overlay');
    if (preloader) {
      preloader.style.display = 'flex';
      
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1500);
    }
  }
  
  function initCyberpunkSite() {
    showPreloader();
    
    setTimeout(() => {
      addCyberpunkEffects();
      
      setupTabEvents();
      
      generateSystemGrid();
      
      setupBackToTopButton();
      
      setupScrollObserver();
      
      document.querySelectorAll('.downloads-section').forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.1}s`;
      });
      
      document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          this.style.setProperty('--mouse-x', `${x}px`);
          this.style.setProperty('--mouse-y', `${y}px`);
        });
      });
      
      console.log('Inicialização cyberpunk concluída!');
    }, 300);
  }
  
  document.addEventListener('DOMContentLoaded', initCyberpunkSite);
  
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.loading-overlay');
    if (preloader && preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });
