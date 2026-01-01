# Guia de Instalação Rápida

## Passo a Passo

### 1. Instalar Dependências
```bash
npm install
```

### 2. Gerar Prisma Client
```bash
npm run prisma:generate
```

### 3. Criar Tabelas no Banco de Dados
```bash
npm run prisma:push
```

### 4. Popular Banco com Dados Iniciais
```bash
npm run prisma:seed
```

### 5. Executar o Projeto

**Opção 1: Frontend e Backend juntos (Recomendado)**
```bash
npm run dev:all
```

**Opção 2: Separadamente**
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

### 6. Acessar a Aplicação

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Prisma Studio (GUI do banco): `npm run prisma:studio`

## Solução de Problemas

### Erro: "Prisma Client is not configured"
```bash
npm run prisma:generate
```

### Erro de conexão com banco de dados
1. Verifique se o arquivo `.env` existe
2. Confirme se a `DATABASE_URL` está correta
3. Teste a conexão: `npm run prisma:studio`

### Porta 3001 ou 5173 já em uso
- Mude a porta no arquivo `.env` (PORT=3002)
- Ou finalize o processo que está usando a porta

## Comandos Úteis

```bash
# Ver dados no banco (interface visual)
npm run prisma:studio

# Resetar banco e recriar dados
npm run prisma:push
npm run prisma:seed

# Verificar status da API
curl http://localhost:3001/api/health
```
