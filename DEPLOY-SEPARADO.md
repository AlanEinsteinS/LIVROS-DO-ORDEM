# 🚀 Deploy Separado: Frontend (Vercel) + Backend (Railway)

## 📦 Visão Geral

```
┌─────────────────┐         ┌─────────────────┐
│  VERCEL         │  API    │  RAILWAY        │
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

## 🎯 PARTE 1: Deploy do Backend (Railway)

### Passo 1: Criar conta no Railway

1. Acesse https://railway.app
2. Faça login com GitHub
3. Autorize o Railway a acessar seus repositórios

### Passo 2: Criar novo projeto

1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha o repositório `LIVROS-DO-ORDEM`
4. Aguarde o Railway detectar automaticamente

### Passo 3: Configurar variáveis de ambiente

No Railway, vá em **Variables** e adicione:

```env
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19CSUNTOXhFV1h1ZkpjWWxyUGRWQ1giLCJhcGlfa2V5IjoiMDFLRTI4Qk0xMDI4MlFLMTJYUE1OWDI5NEsiLCJ0ZW5hbnRfaWQiOiI4ZjE3ZTA2NWNjYTU3YzgyYzYyMmRmMzhkMzA2YmQ2NmFlNWJhYTM5Y2Q3OWU0ZDU2OTQ0NGFlOTY3MzgzYjFiIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDAwNzcyZGYtNTk0Ni00YjM3LTkxNzQtYTE5M2Q3MmY0MWI3In0.GU9dyLe92IUkQpTSuni5GgncrZXg8u9TqUO3N3MeEf4

NODE_ENV=production

PORT=3001
```

### Passo 4: Configurar comandos de build

Railway detecta automaticamente, mas confirme:

- **Build Command**: `npm install`
- **Start Command**: `node server/index.js`

### Passo 5: Configurar domínio público

1. Vá em **Settings → Networking**
2. Clique em **"Generate Domain"**
3. **Copie a URL gerada** (algo como `https://livros-do-ordem-production.up.railway.app`)

### Passo 6: Testar o backend

Acesse no navegador:
```
https://sua-url-railway.up.railway.app/api/health
```

Deve retornar:
```json
{"status":"ok","message":"API is running"}
```

✅ **Backend deployado com sucesso!**

---

## 🎨 PARTE 2: Deploy do Frontend (Vercel)

### Passo 1: Preparar o projeto

Certifique-se que `vercel.json` existe na raiz (já criado ✅)

### Passo 2: Deploy via dashboard

1. Acesse https://vercel.com
2. Clique em **"Add New..." → "Project"**
3. Importe o repositório `LIVROS-DO-ORDEM`

### Passo 3: Configurar o projeto

**Framework Preset**: Vite
**Root Directory**: `./`
**Build Command**: `npm run build` (já configurado)
**Output Directory**: `dist`
**Install Command**: `npm install`

### Passo 4: Configurar variável de ambiente

**IMPORTANTE**: Adicione esta variável de ambiente na Vercel:

```
Name: VITE_API_URL
Value: https://sua-url-railway.up.railway.app/api
```

⚠️ **Substitua pela URL real do Railway do Passo 5 da Parte 1!**

**Environment**:
- ✅ Production
- ✅ Preview
- ✅ Development

### Passo 5: Deploy

Clique em **"Deploy"** e aguarde!

---

## 🔧 PARTE 3: Configurar CORS no Backend

O backend precisa aceitar requisições do domínio da Vercel.

Atualize `server/index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://seu-projeto.vercel.app',  // ← adicione isso
    'https://*.vercel.app'              // ← aceita todos previews
  ],
  credentials: true
}));
```

Depois do deploy na Vercel, você terá a URL. Adicione ela no CORS e faça redeploy no Railway.

---

## ✅ PARTE 4: Verificar se está funcionando

### Teste 1: Backend
```
https://sua-url-railway.up.railway.app/api/categories
```
Deve retornar JSON com as categorias ✅

### Teste 2: Frontend
```
https://seu-projeto.vercel.app
```
Deve carregar o site e mostrar os livros ✅

### Teste 3: Console do navegador
- Abra F12 no site da Vercel
- Vá em **Network** ou **Rede**
- Recarregue a página
- Verifique se as chamadas API estão funcionando ✅

---

## 🐛 Troubleshooting

### ❌ Erro: CORS blocked
**Causa**: Backend não permite o domínio da Vercel
**Solução**: Atualize o CORS no `server/index.js`

### ❌ Erro: Failed to fetch
**Causa**: `VITE_API_URL` errada ou não configurada
**Solução**:
1. Verifique a variável na Vercel
2. Certifique-se que Railway está rodando

### ❌ Backend retorna 404
**Causa**: URL da API está errada
**Solução**: Verifique se está usando `/api` no final

### ❌ Prisma error no Railway
**Causa**: `DATABASE_URL` não configurada
**Solução**: Adicione a variável no Railway

---

## 📝 Checklist de Deploy

### Backend (Railway):
- [ ] Projeto criado no Railway
- [ ] `DATABASE_URL` configurada
- [ ] `PORT` configurada
- [ ] Deploy realizado com sucesso
- [ ] URL pública gerada
- [ ] Endpoint `/api/health` funcionando
- [ ] Endpoint `/api/categories` retornando dados

### Frontend (Vercel):
- [ ] Projeto criado na Vercel
- [ ] `VITE_API_URL` configurada com URL do Railway
- [ ] Build realizado com sucesso
- [ ] Site carregando corretamente
- [ ] Dados sendo puxados da API
- [ ] CORS configurado no backend

---

## 🔗 URLs Importantes

Anote aqui suas URLs de produção:

**Backend (Railway)**: `_________________________________`

**Frontend (Vercel)**: `_________________________________`

**Banco (Prisma Accelerate)**: Já configurado ✅

---

## 🚀 Deploy Automático (CI/CD)

Depois da primeira configuração, deployments futuros são automáticos:

1. Faça commit e push no GitHub
2. Railway detecta e faz redeploy do backend automaticamente
3. Vercel detecta e faz redeploy do frontend automaticamente

```bash
git add .
git commit -m "feat: update feature"
git push origin main
```

✨ **Ambos deployam automaticamente!**

---

## 💰 Custo

**Railway**: Gratuito até $5/mês de uso
**Vercel**: Gratuito para projetos pessoais
**Prisma Accelerate**: Já está usando (verifica no painel do Prisma)

---

## 📊 Monitoramento

### Railway:
- Acesse o dashboard para ver logs
- Clique em **"View Logs"** para debug

### Vercel:
- Acesse **Project → Deployments**
- Clique no deployment para ver logs
- Use **Runtime Logs** para ver erros em tempo real

---

## 🎉 Pronto!

Seu site está no ar com:
- ✅ Frontend responsivo na Vercel
- ✅ Backend escalável no Railway
- ✅ Banco de dados gerenciado com Prisma Accelerate
- ✅ Deploy automático via GitHub

**Próximos passos opcionais**:
- Configurar domínio customizado
- Adicionar analytics
- Configurar monitoring/alertas
