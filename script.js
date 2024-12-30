// Livros Oficiais
const officialBooks = [
    { name: "MANUAL DO PORTILHO", url: "https://drive.google.com/file/d/1er3eVIGK2btomMUju1Izif5jvW5arYzn/view?usp=drive_link" },
    { name: "ORDEM PARANORMAL V1.1", url: "https://drive.google.com/file/d/1Roq06lSvkjdOHyLDUsMWhhMcZFzuZQDJ/view?usp=sharing"},
    { name: "SOBREVIVENDO AO HORROR V1.2", url: "https://drive.google.com/file/d/1MWTJVyBGpRE4DxuPcZqf8rZKK-WC3mDR/view?usp=sharing"}
];

// Livros Homebrew / Não Oficial
const homebrewBooks = [
    { name: "PROTOCOLOS DE ENERGIA", url: "https://drive.google.com/file/d/1lXAbOsIZgtEWTWGTi4hnrKeXIwKfnOoZ/view?usp=drive_link"},
    { name: "ORDO CHAOS h4Ha", url: "https://drive.google.com/file/d/1vijpsrS64oNKc0hwS-jEN3uQhAXM0j_Q/view?usp=drive_link" },
    { name: "MISTERIOS DO OUTRO LADO", url: "https://drive.google.com/file/d/1Dz6Mv5qvt_G9FRRDQCSbyoq2UnA8064K/view?usp=drive_link"},
    { name: "KIMI'S HOMEBOOK", url: "https://drive.google.com/file/d/1_N7kD1Yw8k0kReGm6-igKzcUjr2tIH7P/view?usp=drive_link"},
    { name: "HB'S DO EDUARD", url: "https://drive.google.com/file/d/1IftsSO40ZBS82rd2GBRPo8-uI8B2MBZq/view?usp=drive_link"},
    { name: "A PORRA DO REDSKIN!", url: "https://drive.google.com/file/d/1Mqh0L1AqcEwfN7qCkCUyQLF6i_qdsmCl/view?usp=drive_link"},
    { name: "HB'S DO MAINVIC", url: "https://drive.google.com/file/d/101-RL2qK-TEbt123gdESb_iKDQqAXHOV/view?usp=drive_link"},
    { name: "HB'S DA MEGA", url: "https://drive.google.com/file/d/1A5p5-ZHpYbjh8817a904xHWA8lwJIPj6/view?usp=drive_link"},
    { name: "EXPANSÃO DO MEDO", url: "https://drive.google.com/file/d/10N9cWjZfIFEmwiaatE7eol0Y_h5VVnD3/view?usp=drive_link"},
    { name: "EDIÇÃO EXPANSIVA OP", url: "https://drive.google.com/file/d/1Ml5M2YK4zmwRQ6jqiq4KiNXUWWLbXrm_/view?usp=drive_link"},
    { name: "HB'S DA AGATHA", url: "https://drive.google.com/file/d/165zHqAoWmsNWFJ_wVJHcPTwSYx4nAWbR/view?usp=drive_link"},
    { name: "A CONTEMPLAÇÃO DO OUTRO LADO", url: "https://drive.google.com/file/d/1_xIDhsPZ5iZMY38Q4Wjyfuy-rf6IgniT/view?usp=drive_link"},
    { name: "CATALOGO MACABRO HB", url: "https://docs.google.com/document/d/12brs8IHPVm9YHsj4N7vB9WdUi-Sr3MWK/edit"}
];

// Função para adicionar botões de download
function addDownloadButtons(books, containerId) {
    const container = document.getElementById(containerId);
    books.forEach(book => {
        const button = document.createElement("a");
        button.href = book.url;
        button.textContent = book.name;
        button.className = "download-btn";
        button.target = "_blank";
        container.appendChild(button);
    });
}

// Alternar abas com animação
document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.classList.remove("active");
        });

        button.classList.add("active");
        const targetTab = document.getElementById(button.dataset.tab);
        targetTab.classList.add("active");
    });
});

// Função para gerar o grid com incrementos de 5% na porcentagem e 1 na contagem
function generateSystemGrid() {
    const gridContainer = document.getElementById("system-grid");
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

    for (let i = 1; i <= 20; i++) { // Atualizado para ir até 20 (99%)
        const percentage = i * 5; // Incrementa 5% a cada iteração
        const count = i; // Contagem de 1 a 20
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";

        // Ajuste para que o 20º item seja 99% / 20
        const percentageText = (i === 20) ? `99% / ${count}` : `${percentage}% / ${count}`;

        // Adicionando a descrição personalizada
        const descriptionText = descriptions[i - 1];

        gridItem.innerHTML = `
            <div class="percentage">${percentageText}</div>
            <div class="description">${descriptionText}</div>
        `;

        gridContainer.appendChild(gridItem);
    }
}

// Chamar a função para gerar o grid
generateSystemGrid();


// Adicionar botões
addDownloadButtons(officialBooks, "official-books");
addDownloadButtons(homebrewBooks, "homebrew-books");