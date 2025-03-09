// Livros Oficiais com ícones
const officialBooks = [
    { name: "MANUAL DO PORTILHO", url: "https://drive.google.com/file/d/1er3eVIGK2btomMUju1Izif5jvW5arYzn/view?usp=drive_link", icon: "fas fa-book" },
    { name: "ORDEM PARANORMAL V1.1", url: "https://drive.google.com/file/d/1Roq06lSvkjdOHyLDUsMWhhMcZFzuZQDJ/view?usp=sharing", icon: "fas fa-skull" },
    { name: "SOBREVIVENDO AO HORROR V1.2", url: "https://drive.google.com/file/d/1MWTJVyBGpRE4DxuPcZqf8rZKK-WC3mDR/view?usp=sharing", icon: "fas fa-ghost" },
    { name: "Expandindo a Fenda V0.40", url: "https://drive.google.com/file/d/1H1hLltZoms8ZS_JjoEW_T9HVM-cAR4EW/view?usp=sharing", icon: "fas fa-virus" }

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
    { name: "CATALOGO MACABRO HB", url: "https://docs.google.com/document/d/12brs8IHPVm9YHsj4N7vB9WdUi-Sr3MWK/edit", icon: "fas fa-book-skull"}
];

// Inicialização do site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
    addDynamicCSS();
});

// Função para inicializar o website
function initializeWebsite() {
    // Adicionar botões de download 
    addDownloadButtons(officialBooks, "official-books");
    addDownloadButtons(homebrewBooks, "homebrew-books");
    addDownloadButtons(passageItems, "passage-items");
    
    // Gerar o grid do sistema
    generateSystemGrid();
    
    // Configurar eventos para as abas
    setupTabEvents();
}

// Função para adicionar botões de download
function addDownloadButtons(books, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Verificação de segurança
    
    container.innerHTML = ''; // Limpar conteúdo atual
    
    books.forEach((book) => {
        const button = document.createElement("a");
        button.href = book.url;
        button.className = "download-btn";
        button.target = "_blank";
        button.rel = "noopener noreferrer"; // Melhor prática de segurança
        
        // Adicionar ícone se disponível
        if (book.icon) {
            const icon = document.createElement("i");
            icon.className = book.icon;
            button.appendChild(icon);
            
            // Adicionar espaço após o ícone
            const space = document.createTextNode(" ");
            button.appendChild(space);
        }
        
        // Adicionar texto do botão
        const textSpan = document.createElement("span");
        textSpan.textContent = book.name;
        button.appendChild(textSpan);
        
        // Adicionar ao container
        container.appendChild(button);
    });
}

// Configurar eventos para as abas
function setupTabEvents() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Se já estiver ativo, não faz nada
            if (button.classList.contains("active")) return;
            
            // Remove classe ativa de todos os botões
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
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
    if (!gridContainer) return; // Verificação de segurança
    
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

    // Limpar o container para evitar duplicações
    gridContainer.innerHTML = '';

    for (let i = 1; i <= 20; i++) {
        const percentage = i * 5; // Incrementa 5% a cada iteração
        const count = i; // Contagem de 1 a 20
        
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        
        // Ajuste para que o 20º item seja 99% / 20
        const percentageText = (i === 20) ? `99% / ${count}` : `${percentage}% / ${count}`;
        
        // Adicionando a descrição personalizada
        const descriptionText = descriptions[i - 1] || `Nível ${i}`; // Fallback caso não tenha descrição
        
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
        
        // Adicionar ao container
        gridContainer.appendChild(gridItem);
    }
}

// Função para adicionar estilos diretamente no CSS (alternativa para animações)
function addDynamicCSS() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes floatAnimation {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
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
            animation: floatAnimation 5s ease-in-out infinite;
        }
        
        .download-btn:hover {
            transform: translateY(-8px);
            background: linear-gradient(145deg, #333333, #222222);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(247, 151, 29, 0.3);
            border-color: #f7971d;
            color: #f7971d;
        }
        
        .grid-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(247, 151, 29, 0.3);
            border-color: #f7971d;
        }
        
        .grid-item:hover .percentage {
            color: #ffa940;
            transform: scale(1.1);
            text-shadow: 0 0 15px rgba(247, 151, 29, 0.6);
        }
        
        .grid-item:hover .description {
            color: #ffffff;
        }
        
        .download-btn i {
            margin-right: 10px;
            transition: transform 0.3s ease;
        }
        
        .download-btn:hover i {
            transform: scale(1.2);
            color: #f7971d;
        }
    `;
    
    document.head.appendChild(styleElement);
}