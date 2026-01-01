# 🔐 Credenciais de Administrador

## Credenciais Padrão

**⚠️ IMPORTANTE: Mude estas credenciais antes de colocar em produção!**

- **Usuário:** `admin`
- **Senha:** `ordo2024`

## Como Mudar as Credenciais

### Opção 1: Editar o Arquivo (Temporário)

Edite o arquivo: `src/components/LoginModal.jsx`

Localize as linhas (aproximadamente linha 17-18):

```javascript
const validUsername = 'admin';
const validPassword = 'ordo2024'; // MUDE ISSO!
```

Altere para suas credenciais desejadas:

```javascript
const validUsername = 'seu_usuario';
const validPassword = 'sua_senha_forte_aqui';
```

### Opção 2: Usar Variáveis de Ambiente (Recomendado)

1. Adicione ao arquivo `.env`:

```env
VITE_ADMIN_USERNAME=seu_usuario
VITE_ADMIN_PASSWORD=sua_senha_forte
```

2. Modifique `src/components/LoginModal.jsx`:

```javascript
const validUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'ordo2024';
```

3. Reinicie o servidor de desenvolvimento

### Opção 3: Backend com JWT (Produção)

Para produção, recomenda-se implementar autenticação via backend:

1. Criar endpoint de login no backend
2. Usar JWT tokens
3. Armazenar senhas hasheadas (bcrypt)
4. Validar tokens nas requisições

## Segurança

### ⚠️ NÃO FAÇA:
- ❌ Commitar credenciais no Git
- ❌ Usar senhas fracas
- ❌ Compartilhar credenciais
- ❌ Deixar credenciais padrão em produção

### ✅ FAÇA:
- ✅ Use senhas fortes (12+ caracteres)
- ✅ Adicione `.env` ao `.gitignore` (já feito)
- ✅ Use autenticação backend em produção
- ✅ Mude as credenciais regularmente

## Exemplo de Senha Forte

```
Ordo#Remier@2024!Adm1n
```

Características:
- Mínimo 12 caracteres
- Letras maiúsculas e minúsculas
- Números
- Caracteres especiais

## Resetar Acesso

Se esquecer a senha, edite o arquivo `src/components/LoginModal.jsx` com as credenciais padrão temporariamente, faça login, e depois mude novamente.

## Próximos Passos (Opcional)

Para maior segurança, implemente:

1. **Backend Authentication**: API endpoint para validar credenciais
2. **JWT Tokens**: Tokens com expiração
3. **Rate Limiting**: Limitar tentativas de login
4. **2FA**: Autenticação de dois fatores
5. **Logs de Acesso**: Registrar tentativas de login
