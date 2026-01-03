# 🚀 Deploy: Frontend (Vercel) + Backend (Render)

## 📦 Visão Geral

```
┌─────────────────┐         ┌─────────────────┐
│  VERCEL         │  API    │  RENDER         │
│  (Frontend)     │────────▶│  (Backend)      │
│                 │         │                 │
│  React + Vite   │         │  Express        │
│                 │         │  + Prisma       │
└─────────────────┘         └────────┬────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │ Prisma Accelerate│
                            │  (PostgreSQL)   │
                            └─────────────────┘
```

---

## 🎯 PARTE 1: Deploy do Backend (Render) - GRÁTIS ✅

### Passo 1: Criar conta no Render

1. Acesse https://render.com
2. Clique em **"Get Started"**
3. Faça login com **GitHub**
4. Autorize o Render a acessar seus repositórios

### Passo 2: Criar novo Web Service

1. No dashboard, clique em **"New +"**
2. Selecione **"Web Service"**
3. Clique em **"Build and deploy from a Git repository"**
4. Clique em **"Connect"** ao lado do repositório `LIVROS-DO-ORDEM`

### Passo 3: Configurar o serviço

Preencha os campos:

**Name**: `livros-do-ordem-api` (ou qualquer nome)

**Region**: `Oregon (US West)` (mais próximo)

**Branch**: `main`

**Root Directory**: (deixe vazio)

**Runtime**: `Node`

**Build Command**:
```bash
npm install && npx prisma generate
```

**Start Command**:
```bash
node server/index.js
```

**Instance Type**: **Free** ✅ (escolha o plano gratuito)

### Passo 4: Adicionar variáveis de ambiente

Role para baixo até **"Environment Variables"** e clique em **"Add Environment Variable"**

Adicione:

**1. DATABASE_URL**
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19CSUNTOXhFV1h1ZkpjWWxyUGRWQ1giLCJhcGlfa2V5IjoiMDFLRTI4Qk0xMDI4MlFLMTJYUE1OWDI5NEsiLCJ0ZW5hbnRfaWQiOiI4ZjE3ZTA2NWNjYTU3YzgyYzYyMmRmMzhkMzA2YmQ2NmFlNWJhYTM5Y2Q3OWU0ZDU2OTQ0NGFlOTY3MzgzYjFiIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDAwNzcyZGYtNTk0Ni00YjM3LTkxNzQtYTE5M2Q3MmY0MWI3In0.GU9dyLe92IUkQpTSuni5GgncrZXg8u9TqUO3N3MeEf4
```

**2. NODE_ENV**
```
production
```

**3. PORT**
```
3001
```

### Passo 5: Criar o serviço

1. Clique em **"Create Web Service"** no final da página
2. Aguarde o deploy (pode levar 5-10 minutos) ⏳
3. Você verá os logs em tempo real

### Passo 6: Copiar a URL do backend

Após o deploy concluir:
1. No topo da página, você verá a URL do serviço
2. Algo como: `https://livros-do-ordem-api.onrender.com`
3. **COPIE ESSA URL** (vamos usar na Vercel)

### Passo 7: Testar o backend

Acesse no navegador:
```
https://sua-url.onrender.com/api/health
```

Deve retornar:
```json
{"status":"ok","message":"API is running"}
```

Teste também:
```
https://sua-url.onrender.com/api/categories
```

✅ **Backend no ar!**

---

## ⚠️ Limitação do Plano Gratuito

O Render Free:
- ✅ **Totalmente gratuito**
- ✅ Deploy automático via GitHub
- ⚠️ **"Hiberna" após 15 minutos sem uso**
- ⚠️ Primeira requisição pode levar 30-60 segundos para "acordar"

**Solução**: O site vai ficar um pouco lento na primeira visita, mas depois funciona normal!

---

## 🎨 PARTE 2: Deploy do Frontend (Vercel)

### Passo 1: Acessar Vercel

1. Acesse https://vercel.com
2. Faça login com **GitHub**
3. Clique em **"Add New..." → "Project"**

### Passo 2: Importar repositório

1. Procure por `LIVROS-DO-ORDEM`
2. Clique em **"Import"**

### Passo 3: Configurar o projeto

**Framework Preset**: Vite ✅ (auto-detectado)

**Root Directory**: `./` (deixe como está)

**Build Command**:
```bash
npm run build
```
(já configurado no package.json)

**Output Directory**:
```
dist
```

**Install Command**:
```bash
npm install
```

### Passo 4: Adicionar variável de ambiente

**IMPORTANTE**: Clique em **"Environment Variables"**

Adicione:

**Key**: `VITE_API_URL`

**Value**: (cole a URL do Render + /api)
```
https://livros-do-ordem-api.onrender.com/api
```

⚠️ **Substitua pela URL real que você copiou no Passo 6 da Parte 1!**

**Environments**: Selecione todos
- ✅ Production
- ✅ Preview
- ✅ Development

### Passo 5: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (2-5 minutos)
3. Copie a URL gerada (ex: `https://livros-do-ordem.vercel.app`)

✅ **Frontend no ar!**

---

## 🔧 PARTE 3: Configurar CORS

O backend precisa aceitar requisições da Vercel.

### Opção A: Atualizar via GitHub

1. Abra `server/index.js` no seu editor
2. Localize a linha com `app.use(cors());`
3. Substitua por:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://livros-do-ordem.vercel.app',  // ← SUA URL da Vercel
    'https://*.vercel.app'                  // ← Aceita previews
  ],
  credentials: true
}));
```

4. Commit e push:
```bash
git add server/index.js
git commit -m "fix: add CORS for Vercel domain"
git push origin main
```

5. O Render vai fazer redeploy automaticamente! ✅

### Opção B: Aceitar todos (menos seguro)

Se quiser liberar geral temporariamente:

```javascript
app.use(cors());  // Já está assim, deixa
```

---

## ✅ PARTE 4: Testar tudo funcionando

### Teste 1: Backend (Render)
```
https://livros-do-ordem-api.onrender.com/api/categories
```
✅ Deve retornar JSON com categorias

### Teste 2: Frontend (Vercel)
```
https://livros-do-ordem.vercel.app
```
✅ Deve carregar o site

### Teste 3: API funcionando no site

1. Abra o site da Vercel
2. Pressione **F12** (console do navegador)
3. Vá na aba **Network/Rede**
4. Recarregue a página
5. Veja se as chamadas `/api/categories` estão com status **200 OK**

✅ **Tudo funcionando!**

---

## 🐛 Troubleshooting

### ❌ Site carrega mas sem dados
**Causa**: `VITE_API_URL` errada
**Solução**:
1. Vá na Vercel → Settings → Environment Variables
2. Verifique se está correta
3. Redeploy: Deployments → ... → Redeploy

### ❌ CORS error
**Causa**: Backend não permite o domínio da Vercel
**Solução**: Atualize o CORS no `server/index.js` (Parte 3)

### ❌ Backend lento na primeira requisição
**Causa**: Plano gratuito do Render hiberna
**Solução**: Normal! Aguarde 30-60 segundos na primeira visita

### ❌ Build falha no Render
**Causa**: Comando de build errado
**Solução**: Certifique-se que está:
```
npm install && npx prisma generate
```

---

## 📝 Checklist

### Backend (Render):
- [ ] Conta criada no Render
- [ ] Web Service criado
- [ ] Build Command: `npm install && npx prisma generate`
- [ ] Start Command: `node server/index.js`
- [ ] `DATABASE_URL` adicionada
- [ ] Deploy concluído
- [ ] `/api/health` funcionando
- [ ] `/api/categories` retornando dados

### Frontend (Vercel):
- [ ] Projeto importado
- [ ] `VITE_API_URL` configurada
- [ ] Build concluído
- [ ] Site carregando
- [ ] Dados aparecendo
- [ ] CORS configurado

---

## 🔗 Anote suas URLs

**Backend (Render)**: `_________________________________`

**Frontend (Vercel)**: `_________________________________`

---

## 🚀 Deploy Automático

Agora qualquer push no GitHub atualiza automaticamente:

```bash
git add .
git commit -m "feat: nova feature"
git push origin main
```

✅ Render redeploy backend
✅ Vercel redeploy frontend

**Tudo automático!**

---

## 💰 Custo Total: R$ 0,00

- **Render Free**: Grátis para sempre
- **Vercel Free**: Grátis para sempre
- **Prisma Accelerate**: Você já tem ✅

---

## 🎉 Pronto!

Seu site de terror está no ar! 🩸👻

**Próximos passos (opcional)**:
- Domínio customizado na Vercel
- Configurar analytics
- Adicionar sitemap
