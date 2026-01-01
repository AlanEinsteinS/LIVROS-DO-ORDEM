# 🚀 ORDO REMIER - Sistema de Livros RPG

## Início Rápido

### Para Iniciar o Projeto

```bash
npm start
```

Isso iniciará automaticamente:
- ✅ Frontend React (http://localhost:5173)
- ✅ Backend API (http://localhost:3001)

### Primeira Vez? Configure Tudo de Uma Vez

```bash
npm run setup
```

Esse comando irá:
1. Instalar todas as dependências
2. Gerar o Prisma Client
3. Criar as tabelas no banco de dados
4. Popular com dados iniciais

## 📋 Funcionalidades

### Usuário Normal
- ✅ Visualizar livros oficiais
- ✅ Visualizar homebrews/não oficiais
- ✅ Visualizar edições da Passagem
- ✅ Consultar tabela global do sistema
- ✅ Design cyberpunk com animações

### Modo Administrador

**Login Obrigatório:**
- Usuário: `admin`
- Senha: `ordo2024`
- **⚠️ MUDE AS CREDENCIAIS!** Veja [ADMIN-CREDENTIALS.md](ADMIN-CREDENTIALS.md)

**Ações Disponíveis:**
1. **Ativar modo admin**: Clique no botão "Admin" (canto superior direito)
2. **Fazer login**: Digite usuário e senha
3. **Adicionar livros**: Botão "Adicionar Livro" aparece em cada seção
4. **Editar livros**: Ícone de lápis ao passar mouse sobre livros
5. **Deletar livros**: Botão dentro do modal de edição
6. **Logout**: Clique no botão "Admin" novamente quando ativo

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm start                  # Inicia frontend + backend
npm run dev               # Apenas frontend
npm run dev:server        # Apenas backend

# Banco de Dados
npm run prisma:studio     # Interface visual do banco
npm run prisma:seed       # Repopular dados

# Produção
npm run build             # Build para produção
npm run preview           # Preview do build
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── AdminControls     # Controle modo admin
│   ├── BookModal         # Modal add/edit/delete
│   ├── BookSection       # Seção de livros
│   └── ...
├── hooks/
│   └── useApi.js         # Integração com API
├── App.jsx               # App principal
└── main.jsx              # Entry point

server/
└── index.js              # API Express

prisma/
├── schema.prisma         # Schema do banco
└── seed.js               # Dados iniciais
```

## 🔗 Links Importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Prisma Studio**: Execute `npm run prisma:studio`
- **Documentação**: Veja [README.md](README.md)
- **Guia de Migração**: Veja [MIGRATION.md](MIGRATION.md)

## ⚡ Stack Tecnológica

- **Frontend**: React 18 + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Prisma.io)
- **ORM**: Prisma 5
- **Styling**: CSS3 com tema cyberpunk

## 🎨 Tema Visual

Design inspirado em cyberpunk com:
- Cores neon (cyan, purple, pink)
- Efeitos de glitch
- Scan lines animadas
- Responsivo para todos dispositivos

## 📞 Suporte

- Discord: https://discord.gg/DYmwj6yvYN
- GitHub: https://github.com/AlanEinsteinS
- Instagram: https://www.instagram.com/darkudassos/

---

**Desenvolvido por alan**
