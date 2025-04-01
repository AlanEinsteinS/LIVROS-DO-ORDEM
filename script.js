// Inicializar botões sociais
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-icon');
    
    socialButtons.forEach(button => {
        // Encontrar o ícone dentro do botão
        const icon = button.querySelector('i');
        if (!icon) return;
        
        // Extrair a classe do ícone (fa-discord, fa-github, etc.)
        const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('fa-'));
        if (!iconClass) return;
        
        // Definir o URL correto com base no ícone
        if (socialLinks[iconClass]) {
            button.href = socialLinks[iconClass];
        }
    });
}

// Observador de rolagem para animar elementos quando eles aparecem na tela
function setupScrollObserver() {
    // Se o IntersectionObserver não estiver disponível, não faz nada
    if (!('IntersectionObserver' in window)) return;
    
    // Seleciona todos os elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.download-btn, .grid-item, .downloads-section, .system-info');
    
    // Configuração do observador
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% do elemento precisa estar visível
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'visible');
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);
    
    // Observa cada elemento
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Adicionar efeitos especiais e animações dinâmicas
function addSpecialEffects() {
    // Adicionar efeitos CSS dinâmicos
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes floatAnimation {
            0% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(-1deg); }
            75% { transform: translateY(8px) rotate(1deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes glowAnimation {
            0% { text-shadow: 0 0 5px rgba(247, 151, 29, 0.3); }
            50% { text-shadow: 0 0 20px rgba(247, 151, 29, 0.8), 0 0 30px rgba(247, 151, 29, 0.6); }
            100% { text-shadow: 0 0 5px rgba(247, 151, 29, 0.3); }
        }
        
        .first-word {
            animation: glowAnimation 3s infinite;
        }
        
        .second-word {
            animation: floatAnimation 8s ease-in-out infinite;
        }
        
        .download-btn {
            transition: transform 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
                        background 0.4s ease,
                        box-shadow 0.4s ease,
                        border-color 0.4s ease,
                        color 0.4s ease;
        }
        
        .download-btn i {
            transition: transform 0.5s cubic-bezier(0.17, 0.84, 0.44, 1), color 0.4s ease;
        }
        
        .animated {
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.17, 0.84, 0.44, 1);
        }
        
        .download-btn.animated:not(.visible) {
            opacity: 0;
            transform: translateY(50px);
        }
        
        .grid-item.animated:not(.visible) {
            opacity: 0;
            transform: translateY(50px);
        }
        
        .downloads-section.animated:not(.visible) {
            opacity: 0;
            transform: translateY(50px);
        }
        
        .system-info.animated:not(.visible) {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animated.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .tab-content {
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.17, 0.84, 0.44, 1);
        }
    `;
    
    document.head.appendChild(styleElement);
    
    // Movimento do mouse para efeito parallax nos cartões
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.download-btn, .grid-item');
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distanceX = mouseX - cardCenterX;
            const distanceY = mouseY - cardCenterY;
            
            // Limitar efeito apenas para cartões próximos ao mouse
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            if (distance < 300) { // Apenas aplicar em elementos próximos do mouse
                const strength = 15; // Força do efeito
                const maxRotate = 5; // Rotação máxima em graus
                
                const rotateX = Math.max(Math.min(distanceY / strength, maxRotate), -maxRotate);
                const rotateY = Math.max(Math.min(-distanceX / strength, maxRotate), -maxRotate);
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = '';
            }
        });
    });
}// Configurar botão de voltar ao topo com animação suave
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Mostrar/ocultar botão baseado na posição de rolagem
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Ação de clique do botão
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Adicionar efeito de smooth scroll para links internos
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configurar efeito parallax no cabeçalho
function setupHeaderParallax() {
    const header = document.querySelector('header');
    const title = document.querySelector('header h1');
    const subtitle = document.querySelector('header p');
    
    if (!header || !title || !subtitle) return;
    
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        
        if (scrollValue < 600) {
            const translateY = scrollValue * 0.3;
            const opacity = 1 - (scrollValue * 0.002);
            
            subtitle.style.transform = `translateY(${translateY}px)`;
            header.style.backgroundPosition = `center ${scrollValue * 0.05}px`;
            
            // Ajustar opacidade para efeito de fade-out ao rolar
            if (opacity > 0) {
                title.style.opacity = opacity;
                subtitle.style.opacity = opacity;
            }
        }
    });
}// Função para gerar o grid do sistema com animações aprimoradas
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
        gridItem.style.opacity = '0';
        gridItem.style.transform = 'translateY(50px)';
        gridItem.style.transition = `all 0.6s cubic-bezier(0.17, 0.84, 0.44, 1) ${i * 0.07}s`;
        
        // Ajuste para que o 20º item seja 99% / 20
        const percentageText = (i === 20) ? `99% / ${count}` : `${percentage}% / ${count}`;
        
        // Adicionando a descrição personalizada
        const descriptionText = descriptions[i - 1] || `Nível ${i}`;
        
        // Criar o elemento de porcentagem
        const percentageDiv = document.createElement("div");
        percentageDiv.className = "percentage";
        percentageDiv.textContent = percentageText;
        
        // Criar o elemento de descrição
        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        descriptionDiv.textContent = descriptionText;
        
        // Adicionar os elementos ao item do grid
        gridItem.appendChild(percentageDiv);
        gridItem.appendChild(descriptionDiv);
        
        // Adicionar efeito de hover interativo
        gridItem.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-18px) scale(1.05)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.8), 0 15px 30px rgba(247, 151, 29, 0.5)';
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'linear-gradient(145deg, rgba(45, 45, 45, 0.97), rgba(25, 25, 25, 0.97))';
            
            const percentage = this.querySelector('.percentage');
            if (percentage) {
                percentage.style.transform = 'scale(1.25)';
            }
            
            const description = this.querySelector('.description');
            if (description) {
                description.style.color = 'var(--text-light)';
                description.style.transform = 'translateY(-5px)';
            }
        });
        
        gridItem.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
            this.style.background = '';
            
            const percentage = this.querySelector('.percentage');
            if (percentage) {
                percentage.style.transform = '';
            }
            
            const description = this.querySelector('.description');
            if (description) {
                description.style.color = '';
                description.style.transform = '';
            }
        });
        
        // Adicionar ao container
        gridContainer.appendChild(gridItem);
    }
}// Função para adicionar botões de download com efeitos premium
function addDownloadButtons(books, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    books.forEach((book) => {
        const button = document.createElement("a");
        button.href = book.url;
        button.className = "download-btn";
        button.target = "_blank";
        button.rel = "noopener noreferrer";
        
        // Adicionar ícone com efeitos visuais
        if (book.icon) {
            const iconElement = document.createElement("i");
            iconElement.className = book.icon;
            button.appendChild(iconElement);
        }
        
        // Adicionar texto do botão em um span
        const textSpan = document.createElement("span");
        textSpan.textContent = book.name;
        button.appendChild(textSpan);
        
        // Adicionar elemento de brilho para efeito de hover
        const shineElement = document.createElement("div");
        shineElement.className = "shine-effect";
        button.appendChild(shineElement);
        
        // Adicionar efeito de hover/animação
        button.addEventListener('mouseenter', function() {
            iconElement.style.transform = 'scale(1.5) rotate(15deg)';
            iconElement.style.color = 'var(--dark-bg)';
        });
        
        button.addEventListener('mouseleave', function() {
            iconElement.style.transform = '';
            iconElement.style.color = '';
        });
        
        // Adicionar ao container
        container.appendChild(button);
    });
}

// Configurar eventos para as abas com transições mais suaves
function setupTabEvents() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Se já estiver ativo, não faz nada
            if (button.classList.contains("active")) return;
            
            // Remove classe ativa de todos os botões
            tabButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.style.transform = '';
            });
            
            // Adiciona classe ativa ao botão clicado
            button.classList.add("active");
            button.style.transform = 'translateY(-8px)';
            
            // Oculta todas as abas atuais com fade-out
            document.querySelectorAll(".tab-content").forEach(tab => {
                tab.style.opacity = '0';
                tab.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    tab.classList.remove("active");
                    tab.style.display = 'none';
                }, 400);
            });
            
            // Mostra a nova aba com fade-in
            const targetTabId = button.dataset.tab;
            const targetTab = document.getElementById(targetTabId);
            
            if (targetTab) {
                setTimeout(() => {
                    targetTab.classList.add("active");
                    targetTab.style.display = 'block';
                    
                    setTimeout(() => {
                        targetTab.style.opacity = '1';
                        targetTab.style.transform = 'scale(1)';
                    }, 50);
                }, 450);
            }
        });
    });
}// Função principal de inicialização do site
function initializeWebsite() {
    // Adicionar botões de download com animações
    addDownloadButtons(officialBooks, "official-books");
    addDownloadButtons(homebrewBooks, "homebrew-books");
    addDownloadButtons(passageItems, "passage-items");
    
    // Gerar o grid do sistema com efeitos melhorados
    generateSystemGrid();
    
    // Configurar navegação entre abas
    setupTabEvents();
    
    // Adicionar smooth scroll
    addSmoothScroll();
    
    // Configurar botão de voltar ao topo
    setupBackToTopButton();
    
    // Adicionar efeitos de parallax no cabeçalho
    setupHeaderParallax();
    
    // Observador de rolagem para animações ao visualizar elementos
    setupScrollObserver();
}

// Aplicar animações sequenciais de entrada
function applyEntryAnimations() {
    const animatedElements = [
        { selector: 'header .header-container', delay: 100, class: 'fade-in' },
        { selector: '.tabs', delay: 500, class: 'fade-in' },
        { selector: '.tab-btn', delay: 700, class: 'scale-in', stagger: 150 },
        { selector: '.downloads-section', delay: 900, class: 'fade-in' },
        { selector: '.system-info', delay: 1100, class: 'fade-in' },
        { selector: '.download-btn', delay: 1300, class: 'scale-in', stagger: 100 },
        { selector: '.grid-item', delay: 1300, class: 'scale-in', stagger: 100 }
    ];
    
    animatedElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = item.class === 'scale-in' ? 'scale(0.8)' : 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.17, 0.84, 0.44, 1)';
                el.style.opacity = '1';
                el.style.transform = 'none';
            }, item.delay + (item.stagger ? item.stagger * index : 0));
        });
    });
}// URLs para os botões sociais
const socialLinks = {
    'fa-discord': 'https://discord.gg/DYmwj6yvYN',
    'fa-github': 'https://github.com/AlanEinsteinS',
    'fa-instagram': 'https://www.instagram.com/darkudassos/'
};

// Inicialização do site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar animação de carregamento
    showPreloader();
    
    // Inicializar o site após pequeno delay para mostrar o preloader
    setTimeout(() => {
        initializeWebsite();
        addSpecialEffects();
        initSocialButtons();
        
        // Aplicar efeitos de entrada com animações sequenciais
        applyEntryAnimations();
    }, 500);
});

// Função para mostrar o preloader
function showPreloader() {
    const preloader = document.querySelector('.loading-overlay');
    if (preloader) {
        preloader.style.display = 'flex';
        
        // Ocultar o preloader após 2 segundos
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 2000);
    }
}// Livros Oficiais com ícones
const officialBooks = [
    { name: "MANUAL DO PORTILHO", url: "https://drive.google.com/file/d/1er3eVIGK2btomMUju1Izif5jvW5arYzn/view?usp=drive_link", icon: "fas fa-book" },
    { name: "ORDEM PARANORMAL V1.1", url: "https://drive.google.com/file/d/1Roq06lSvkjdOHyLDUsMWhhMcZFzuZQDJ/view?usp=sharing", icon: "fas fa-skull" },
    { name: "SOBREVIVENDO AO HORROR V1.2", url: "https://drive.google.com/file/d/1MWTJVyBGpRE4DxuPcZqf8rZKK-WC3mDR/view?usp=sharing", icon: "fas fa-ghost" },
    { name: "Expandindo a Fenda V0.42", url: "https://drive.google.com/file/d/13ZbLh8F-tOHNNaPxd96c3AnP0iitamg7/view?usp=sharing", icon: "fas fa-virus" }
];

// Itens da seção "A Passagem"
const passageItems = [
    { name: "Edição 004", url: "https://drive.google.com/drive/folders/1T9p8XJU4eiaUjbHVOewd1fHiOpBtvAS5?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 005", url: "https://drive.google.com/drive/folders/1-_9_amA3EgkwhLrU8IEEnt2pwSHC06_M?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 006", url: "https://drive.google.com/drive/folders/1jMJvKIPWPOFdFUS3Ap96JUTOFZ5xCxpu?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 007", url: "https://drive.google.com/drive/folders/1vfpQyxpcRZs3A3YPSvhMu9KqIB95YTtN?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 008", url: "https://drive.google.com/drive/folders/1ZD5Y4Gq3q0h3dX3hT7s8uTedUfUIAsjD?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 009", url: "https://drive.google.com/drive/folders/1oBUGBu0OTzWbolQkuqjEDrE5mc8-FmQt?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 010", url: "https://drive.google.com/drive/folders/1oBUGBu0OTzWbolQkuqjEDrE5mc8-FmQt?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 011", url: "https://drive.google.com/drive/folders/1WIPOvmfOZKJhkQ_XwFnFZYZ16ClD5ntJ?usp=sharing", icon: "fas fa-file-pdf" },
    { name: "Edição 012", url: "https://drive.google.com/drive/folders/1oYcX4HC8DnfPntHPovwtaNHIxSC5ciJl?usp=sharing", icon: "fas fa-file-pdf" }
];

// Livros Homebrew / Não Oficial com ícones animados
const homebrewBooks = [
    { name: "PROTOCOLOS DE ENERGIA", url: "https://drive.google.com/file/d/1lXAbOsIZgtEWTWGTi4hnrKeXIwKfnOoZ/view?usp=drive_link", icon: "fas fa-bolt"},
    { name: "ORDO CHAOS h4Ha", url: "https://drive.google.com/file/d/1vijpsrS64oNKc0hwS-jEN3uQhAXM0j_Q/view?usp=drive_link", icon: "fas fa-biohazard" },
    { name: "MISTERIOS DO OUTRO LADO", url: "https://drive.google.com/file/d/1Dz6Mv5qvt_G9FRRDQCSbyoq2UnA8064K/view?usp=drive_link", icon: "fas fa-eye"},
    { name: "KIMI'S HOMEBOOK", url: "https://drive.google.com/file/d/1_N7kD1Yw8k0kReGm6-igKzcUjr2tIH7P/view?usp=drive_link", icon: "fas fa-book-open"},
    { name: "HB'S DO EDUARD", url: "https://drive.google.com/file/d/1IftsSO40ZBS82rd2GBRPo8-uI8B2MBZq/view?usp=drive_link", icon: "fas fa-hat-wizard"},
    { name: "A PORRA DO REDSKIN!", url: "https://drive.google.com/file/d/1Mqh0L1AqcEwfN7qCkCUyQLF6i_qdsmCl/view?usp=drive_link", icon: "fas fa-fire"},
    { name: "HB'S DO MAINVIC", url: "https://drive.google.com/file/d/101-RL2qK-TEbt123gdESb_iKDQqAXHOV/view?usp=drive_link", icon: "fas fa-scroll"},
    { name: "HB'S DA MEGA", url: "https://drive.google.com/file/d/1A5p5-ZHpYbjh8817a904xHWA8lwJIPj6/view?usp=drive_link", icon: "fas fa-gem"},
    { name: "EXPANSÃO DO MEDO", url: "https://drive.google.com/file/d/10N9cWjZfIFEmwiaatE7eol0Y_h5VVnD3/view?usp=drive_link", icon: "fas fa-spider"},
    { name: "EDIÇÃO EXPANSIVA OP", url: "https://drive.google.com/file/d/1Ml5M2YK4zmwRQ6jqiq4KiNXUWWLbXrm_/view?usp=drive_link", icon: "fas fa-expand"},
    { name: "HB'S DA AGATHA", url: "https://drive.google.com/file/d/165zHqAoWmsNWFJ_wVJHcPTwSYx4nAWbR/view?usp=drive_link", icon: "fas fa-wand-magic-sparkles"},
    { name: "A CONT. DO OUTRO LADO", url: "https://drive.google.com/file/d/1_xIDhsPZ5iZMY38Q4Wjyfuy-rf6IgniT/view?usp=drive_link", icon: "fas fa-door-open"},
    { name: "CATALOGO MACABRO HB", url: "https://docs.google.com/document/d/12brs8IHPVm9YHsj4N7vB9WdUi-Sr3MWK/edit", icon: "fas fa-book-skull"},
    { name: "Suplemento Idade das Trevas", url: "https://drive.google.com/file/d/1aYcXbq-a4hj55vwMQvIY5rpGflzOkge9/view?usp=drive_link", icon: "fas fa-mask"},
    { name: "Grimorio Paranormal Rituais", url: "https://drive.google.com/drive/folders/1LojkQdOFxyUS8e5A4luT-VPW2smCbXSz?usp=sharing", icon: "fas fa-scroll"},
    { name: "Grimorio Paranormal Itens", url: "https://drive.google.com/drive/folders/1ziQ1QbG_W7NpLloWeypOC69c9jZVpGCI?usp=sharing", icon: "fas fa-eye"},
    { name: "Grimorio Paranormal DLC'S", url: "https://drive.google.com/drive/folders/1Z07qMe191BYQrxJTscBUlQSQyQbe8pQ7?usp=sharing", icon: "fas fa-star"}
];