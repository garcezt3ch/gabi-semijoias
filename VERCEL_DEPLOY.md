# Publicação na Vercel — Gabi Semijoias

A configuração da Vercel já está preparada no `vercel.json`. O projeto usa Vite para o frontend e Express/tRPC para API, autenticação e checkout Shopify. A entrada raiz `index.ts` exporta o app Express no formato aceito pelas Vercel Functions.

## Configuração do projeto

Ao importar o repositório na Vercel, mantenha a raiz do projeto como a pasta que contém `package.json` e use os valores abaixo:

- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build`
- Output Directory: `dist/public`
- Node.js Runtime: 22.x, conforme `vercel.json`

Não publique a pasta `client` como raiz. A raiz correta é a pasta que contém `index.ts`, `package.json`, `server`, `client` e `vercel.json`.

## Variáveis de ambiente

Cadastre no painel da Vercel os valores descritos em `.env.example`. Nunca faça commit de um arquivo `.env` real.

Para a vitrine e checkout, configure `SHOPIFY_STORE_DOMAIN` e `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Para o painel protegido, configure também `MANUS_PROJECT_ID`, `MANUS_JWT_SECRET`, `MANUS_OAUTH_API_URL`, `MANUS_API_URL`, `MANUS_API_KEY`, `MANUS_API_BROWSER_KEY` e `OWNER_OPEN_ID`.

O painel administrativo depende de `DATABASE_URL`, pois os usuários e seus papéis são persistidos no MySQL via Drizzle. Depois de configurar o banco, aplique as migrações com `pnpm db:migrate` em um ambiente seguro de administração.

## Teste local antes da publicação

No PowerShell, dentro da raiz do projeto:

```powershell
pnpm install
pnpm check
pnpm build
$env:NODE_ENV="development"
pnpm exec tsx watch server/_core/index.ts
```

Para testar a versão de produção localmente:

```powershell
$env:NODE_ENV="production"
pnpm start
```

## Pagamentos

O checkout atual usa o Shopify Storefront API e retorna o `checkoutUrl` do Shopify. Portanto, não é necessário adicionar Stripe enquanto o Shopify continuar sendo o sistema de comércio e pagamento. PIX, cartão, parcelamento e antifraude devem ser configurados no provedor de pagamentos associado à loja Shopify.

## Imagens

As imagens de teste ficam em `client/public/assets` e são incluídas no build do frontend. Novos produtos comerciais devem ser cadastrados no Shopify, que passa a fornecer preço, estoque e imagem para a vitrine quando as variáveis do Storefront API estiverem configuradas.
