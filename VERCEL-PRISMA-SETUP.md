# 🚀 Deploy Vercel com Prisma 7 + Accelerate - Guia Completo

## ✅ Status Atual do Projeto

Seu projeto está usando:
- **Prisma 7.2.0** com **Prisma Accelerate**
- **React + Vite** (Frontend)
- **Express + Node.js** (Backend)
- **PostgreSQL** via Prisma Accelerate

---

## 📋 Estrutura Atual

```
prisma/
  schema.prisma         ← Schema SEM url (Prisma 7)
  seed.js               ← Seed do banco

prisma.config.ts        ← Configuração do Prisma 7
server/index.js         ← Backend Express
src/                    ← Frontend React
```

---

## 🔧 1. Verificação do Schema (CORRETO ✅)

Seu `prisma/schema.prisma` está correto:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  # NÃO tem url aqui - isso é Prisma 7!
}

model Category { ... }
model Book { ... }
model SystemLevel { ... }
model User { ... }
```

✅ **Isso está PERFEITO para Prisma 7!**

---

## 🌐 2. Configuração da DATABASE_URL

### No `.env` local:
```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=SEU_TOKEN_AQUI"
```

### Na Vercel (Variáveis de Ambiente):

1. Acesse: **Project → Settings → Environment Variables**
2. Adicione:

```
Name: DATABASE_URL
Value: prisma+postgres://accelerate.prisma-data.net/?api_key=SEU_TOKEN_AQUI
Environment: ✅ Production ✅ Preview ✅ Development
```

⚠️ **IMPORTANTE**: Use o mesmo link do Accelerate que está no seu `.env`

---

## 📦 3. Build Script (JÁ CONFIGURADO ✅)

O `package.json` já tem o build correto:

```json
{
  "scripts": {
    "build": "prisma generate && vite build"
  }
}
```

✅ **Isso garante que o Prisma Client seja gerado no deploy da Vercel!**

---

## 🏗️ 4. Como o Prisma 7 Funciona

No Prisma 7 com Accelerate, você **NÃO** precisa de:
- ❌ `prisma db push` no deploy
- ❌ `prisma migrate deploy`
- ❌ Acesso direto ao banco

**Porque:**
- O Prisma Accelerate é um **proxy** que gerencia as conexões
- O schema já existe no banco (você criou localmente)
- A Vercel só precisa do **Prisma Client** gerado

---

## 🔥 5. Diferenças Importantes

### ❌ Prisma 5 (antigo):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  ← tinha isso
}
```

### ✅ Prisma 7 (atual):
```prisma
datasource db {
  provider = "postgresql"
  # sem url aqui!
}
```

E no código:
```javascript
// server/index.js
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL  ← passa aqui
}).$extends(withAccelerate());
```

---

## 🎯 6. Deploy na Vercel - Passo a Passo

### Opção A: Via GitHub (Recomendado)

1. **Commit e Push**:
```bash
git add .
git commit -m "feat: add horror theme and prisma 7 setup"
git push origin main
```

2. **Conectar na Vercel**:
   - Acesse https://vercel.com
   - New Project → Import Git Repository
   - Selecione seu repositório

3. **Configurar Deploy**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (já configurado)
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Adicionar Variável de Ambiente**:
   - Clique em "Environment Variables"
   - Adicione `DATABASE_URL` com sua URL do Accelerate

5. **Deploy** 🚀

### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Adicionar variável de ambiente
vercel env add DATABASE_URL
# Cole: prisma+postgres://accelerate.prisma-data.net/?api_key=...

# Deploy em produção
vercel --prod
```

---

## ⚠️ 7. Problema Comum: Backend Separado

**SEU CASO**: Você tem frontend (React) + backend (Express) no mesmo projeto.

A Vercel é otimizada para **frontend estático** ou **Serverless Functions**.

### Solução Recomendada:

**Frontend na Vercel** + **Backend no Railway/Render**

1. **Frontend (Vercel)**:
   - Deploy apenas do React
   - Configura `VITE_API_URL` para apontar pro backend

2. **Backend (Railway/Render)**:
   - Deploy do Express + Prisma
   - Configura `DATABASE_URL` com Accelerate

Veja o guia completo em: [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

---

## 🧪 8. Teste se está Funcionando

Após o deploy, acesse:

```
https://seu-projeto.vercel.app
```

Abra o Console (F12) e verifique:
- ✅ Sem erros de API
- ✅ Dados carregando
- ✅ Sem erros do Prisma

---

## 🐛 9. Erros Comuns e Soluções

### ❌ "PrismaClient is unable to run in the browser"
**Causa**: Tentando usar Prisma no cliente React
**Solução**: Mova código do Prisma para backend/API routes

### ❌ "The datasource property `url` is no longer supported"
**Causa**: Usando sintaxe do Prisma 5 no Prisma 7
**Solução**: Remova `url = env("DATABASE_URL")` do schema

### ❌ "Cannot connect to database"
**Causa**: `DATABASE_URL` não configurada na Vercel
**Solução**: Adicione a variável nas Environment Variables

### ❌ Build falha: "Cannot find module '@prisma/client'"
**Causa**: Prisma Client não foi gerado
**Solução**: Certifique-se que `build` tem `prisma generate`

---

## 📊 10. Checklist Final

Antes de fazer deploy:

- [ ] `DATABASE_URL` está no `.env` local
- [ ] `package.json` tem `"build": "prisma generate && vite build"`
- [ ] Schema está sem `url` no datasource
- [ ] Código usa `accelerateUrl` no PrismaClient
- [ ] Backend está deployado (se usar Express)
- [ ] Variáveis de ambiente configuradas na Vercel

---

## 🎉 11. Depois do Deploy

1. **Configure domínio customizado** (opcional)
2. **Configure CORS** no backend para aceitar domínio da Vercel
3. **Monitore logs** para ver se há erros
4. **Teste todas as funcionalidades**

---

## 📞 Links Úteis

- [Prisma 7 Docs](https://www.prisma.io/docs)
- [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate)
- [Vercel Docs](https://vercel.com/docs)
- [Railway](https://railway.app) (para backend)
- [Render](https://render.com) (alternativa backend)

---

## 🔥 Resumo Executivo

### Para deploy **APENAS do frontend**:
```bash
1. Adicione DATABASE_URL na Vercel
2. Certifique-se que build tem "prisma generate"
3. Deploy!
```

### Para deploy **frontend + backend**:
```bash
1. Deploy backend no Railway/Render
2. Deploy frontend na Vercel
3. Configure VITE_API_URL na Vercel apontando pro backend
4. Pronto!
```

**Seu setup atual está CORRETO para Prisma 7!** 🎯
