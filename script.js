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
];

// Adiciona os botões de download dinamicamente
function addDownloadButtons(books, containerId) {
    const container = document.getElementById(containerId);
    books.forEach(book => {
        const button = document.createElement("a");
        button.href = book.url;
        button.textContent = book.name;
        button.className = "download-btn";
        button.download = "";
        container.appendChild(button);
    });
}



// Popula as seções
addDownloadButtons(officialBooks, "official-books");
addDownloadButtons(homebrewBooks, "homebrew-books");
