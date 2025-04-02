// Função para criar os efeitos cyberpunk no header
function addCyberpunkEffects() {
    // Adicionar caracteres aleatórios em estilo "Matrix" no fundo do header
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
    
    // Adicionar efeito de "glitch" ocasional nos textos
    const firstWord = document.querySelector('header h1 .first-word');
    const secondWord = document.querySelector('header h1 .second-word');
    
    if (firstWord && secondWord) {
      // Efeito de "glitch" ocasional
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
  
  // Função para configurar eventos das abas
  function setupTabEvents() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Se já estiver ativo, não faz nada
        if (button.classList.contains("active")) return;
        
        // Remove classe ativa de todos os botões
        tabButtons.forEach(btn => {
          btn.classList.remove("active");
        });
        
        // Adiciona classe ativa ao botão clicado
        button.classList.add("active");
        
        // Oculta todas as abas atuais
        document.querySelectorAll(".tab-content").forEach(tab => {
          tab.classList.remove("active");
        });
        
        // Mostra a nova aba
        const targetTabId = button.dataset.tab;
        const targetTab = document.getElementById(targetTabId);
        
        if (targetTab) {
          targetTab.classList.add("active");
        }
      });
    });
  }
  
  // Função para gerar o grid do sistema
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
      "Versatilidade | Poder Geral, Classe | Afinidade/Clausura",
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
      
      // Ajuste para que o 20º item seja 99% / 20
      const percentageText = (i === 20) ? `99% / ${count}` : `${percentage}% / ${count}`;
      
      // Criar o elemento de porcentagem
      const percentageDiv = document.createElement("div");
      percentageDiv.className = "percentage";
      percentageDiv.textContent = percentageText;
      
      // Criar o elemento de descrição
      const descriptionDiv = document.createElement("div");
      descriptionDiv.className = "description";
      descriptionDiv.textContent = descriptions[i - 1] || `Nível ${i}`;
      
      // Adicionar linha cyberpunk ao item
      const cyberLine = document.createElement("div");
      cyberLine.className = "cyber-line";
      
      // Adicionar os elementos ao item do grid
      gridItem.appendChild(percentageDiv);
      gridItem.appendChild(descriptionDiv);
      gridItem.appendChild(cyberLine);
      
      // Adicionar ao container
      gridContainer.appendChild(gridItem);
    }
  }
  
  // Função para configurar o botão de voltar ao topo
  function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Mostrar/ocultar botão baseado na posição de rolagem
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Ação de clique do botão
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Função para animar elementos quando eles entram no viewport
  function setupScrollObserver() {
    const animatedElements = document.querySelectorAll('.animated');
    
    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores que não suportam IntersectionObserver
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
  
  // Função para mostrar o preloader
  function showPreloader() {
    const preloader = document.querySelector('.loading-overlay');
    if (preloader) {
      preloader.style.display = 'flex';
      
      // Ocultar o preloader após 1.5 segundos
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1500);
    }
  }
  
  // Função principal de inicialização
  function initCyberpunkSite() {
    // Mostrar o preloader primeiro
    showPreloader();
    
    // Inicializar depois de um pequeno delay
    setTimeout(() => {
      // Adicionar efeitos cyberpunk ao header
      addCyberpunkEffects();
      
      // Configurar eventos de clique para as abas
      setupTabEvents();
      
      // Gerar o grid do sistema
      generateSystemGrid();
      
      // Configurar botão de volta ao topo
      setupBackToTopButton();
      
      // Configurar animações de scroll
      setupScrollObserver();
      
      // Adicionar classes para animar elementos específicos
      document.querySelectorAll('.downloads-section').forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.1}s`;
      });
      
      // Adicionar efeito ao passar o mouse nos botões de download
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
  
  // Inicializar o site quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', initCyberpunkSite);
  
  // Garantir que todas as imagens e recursos externos sejam carregados
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.loading-overlay');
    if (preloader && preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });