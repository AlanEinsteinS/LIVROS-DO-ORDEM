# ORDO REMIER - Livros e Homebrews RPG

Aplicação web para visualizar e acessar livros oficiais e homebrews do sistema Ordem Paranormal RPG.

## Versões Disponíveis

Este projeto possui duas versões:

### Versão Original (HTML/CSS/JS Vanilla)
- **Arquivos:** `index.html`, `styles.css`, `script.js`
- Versão funcional sem dependências
- Pode ser aberta diretamente no navegador

### Versão React + Database (Refatorada)
- **Arquivos:** Pasta `src/` com componentes React + API Backend
- Versão moderna usando React + Vite + Express + Prisma + PostgreSQL
- Melhor organização, manutenibilidade e dados persistentes

## Instalação e Execução - Versão React + Database

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Acesso ao banco de dados PostgreSQL (Prisma.io)

### Instalação

```bash
# Instalar dependências
npm install
```

### Configuração do Banco de Dados

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure sua DATABASE_URL no arquivo `.env` (já configurado com Prisma.io)

3. Gere o Prisma Client:
```bash
npm run prisma:generate
```

4. Envie o schema para o banco de dados:
```bash
npm run prisma:push
```

5. Popule o banco de dados com os dados iniciais:
```bash
npm run prisma:seed
```

### Executar em Desenvolvimento

Você pode executar o frontend e backend separadamente ou juntos:

```bash
# Executar apenas o frontend (React + Vite)
npm run dev

# Executar apenas o backend (Express API)
npm run dev:server

# Executar frontend e backend juntos
npm run dev:all
```

- Frontend estará disponível em `http://localhost:5173`
- Backend API estará disponível em `http://localhost:3001`

### Build para Produção

```bash
# Criar build de produção
npm run build

# Visualizar build de produção
npm run preview
```

### Scripts Disponíveis

- `npm run dev` - Inicia o frontend
- `npm run dev:server` - Inicia o backend
- `npm run dev:all` - Inicia frontend e backend juntos
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build
- `npm run prisma:generate` - Gera Prisma Client
- `npm run prisma:push` - Envia schema para o banco
- `npm run prisma:studio` - Abre Prisma Studio (GUI para banco)
- `npm run prisma:seed` - Popula banco com dados iniciais

## Estrutura do Projeto

```
src/
├── components/              # Componentes React
│   ├── Header.jsx          # Cabeçalho com efeitos cyberpunk
│   ├── TabButton.jsx       # Botão de navegação entre tabs
│   ├── DownloadButton.jsx  # Botão de download de livros
│   ├── BookSection.jsx     # Seção genérica de livros
│   ├── SystemGrid.jsx      # Tabela global do sistema
│   ├── Footer.jsx          # Rodapé
│   ├── BackToTop.jsx       # Botão voltar ao topo
│   └── LoadingOverlay.jsx  # Overlay de carregamento
├── hooks/
│   └── useApi.js           # Custom hooks para API
├── data/
│   └── booksData.js        # Dados estáticos (fallback)
├── App.jsx                 # Componente principal
├── main.jsx                # Ponto de entrada
└── styles.css              # Estilos globais

server/
└── index.js                # API Express

prisma/
├── schema.prisma           # Schema do banco de dados
└── seed.js                 # Script de seed

```

## Características

- Design cyberpunk com efeitos neon
- Animações de glitch e scan lines
- Sistema de tabs responsivo
- Grid de tabela global do sistema
- Links para livros oficiais, homebrews e edições da Passagem
- Totalmente responsivo para mobile

## Tecnologias Utilizadas

### Frontend
- React 18
- Vite
- CSS3 (com variáveis CSS e animações)
- Font Awesome (ícones)
- Google Fonts (Rajdhani e Titillium Web)

### Backend
- Express.js
- Prisma ORM
- PostgreSQL (Prisma.io)
- CORS
- dotenv

## Arquitetura

O projeto utiliza uma arquitetura cliente-servidor:

1. **Frontend (React):** Interface do usuário com componentes reutilizáveis
2. **Backend (Express):** API RESTful para gerenciar dados
3. **Database (PostgreSQL):** Persistência de dados via Prisma ORM

### Endpoints da API

- `GET /api/health` - Status da API
- `GET /api/categories` - Lista todas as categorias com seus livros
- `GET /api/categories/:slug/books` - Livros de uma categoria específica
- `GET /api/system-levels` - Tabela de níveis do sistema
- `POST /api/books` - Criar novo livro
- `PUT /api/books/:id` - Atualizar livro
- `DELETE /api/books/:id` - Deletar livro

## Migração de Vanilla JS para React + Database

As principais mudanças incluem:

1. **Componentização:** Código dividido em componentes reutilizáveis
2. **Hooks React:**
   - `useState` para gerenciar estado das tabs
   - `useEffect` para efeitos colaterais (animações, observers)
   - `useRef` para referências DOM
   - Custom hooks para integração com API
3. **API RESTful:** Backend Express com Prisma ORM
4. **Banco de Dados:** PostgreSQL para persistência
5. **Dados Dinâmicos:** Busca dados da API em tempo real
6. **Event Handlers:** Convertidos para funções React
7. **Intersection Observer:** Mantido para animações de scroll

## Como Usar a Versão Original

Simplesmente abra o arquivo `index.html` no navegador. Não é necessária nenhuma instalação.

## Desenvolvedor

Desenvolvido por alan

## Links

- [Discord](https://discord.gg/DYmwj6yvYN)
- [GitHub](https://github.com/AlanEinsteinS)
- [Instagram](https://www.instagram.com/darkudassos/)
