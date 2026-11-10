# Plano — Gabi Semijoias

## Escopo aprovado
Criar uma loja virtual orgânica e dinâmica para semijoias, com vitrine responsiva, catálogo administrável, produtos/preços/estoque centralizados no Shopify, checkout seguro, campanhas sazonais e uma área de equipe protegida para acompanhar desempenho e orientar ações comerciais.

## Arquitetura e implementação
- **Storefront:** React + Vite no starter web-db-user, com Express/tRPC no servidor.
- **Comércio:** Shopify como fonte de verdade para produtos, preços, variações, estoque, pedidos e checkout; a integração deve ser habilitada pelo fluxo oficial do Webdev.
- **Área da equipe:** rota `/admin` com autenticação Manus OAuth e checagem de papel `admin`, sem credenciais simuladas ou bypass de desenvolvimento. O painel apresenta visão geral, produtos em destaque, alerta de estoque baixo, campanhas sugeridas e acesso operacional ao Shopify Admin.
- **Dados locais:** Drizzle/MySQL guarda perfil e papel dos usuários, além de registros leves para insights e campanhas quando necessário. O catálogo comercial não será duplicado localmente enquanto o Shopify estiver conectado.
- **Evolução de IA:** a estrutura de insights/campanhas separa indicadores de estoque, aceitação e giro para, em uma etapa futura, conectar o LLM gerenciado e gerar recomendações persistidas.
- **Rotas:** `/`, `/colecoes`, `/produto/:handle`, `/admin`, `/sobre`, `/contato`, `/politicas` e `/404`. O manifesto `public/manus-routes.json` será mantido sincronizado.

## Direção visual escolhida

### Alternativas consideradas
1. **Editorial botânico contemporâneo** — luxo leve, materiais naturais e composição assimétrica. Probabilidade: 0,07.
2. **Galeria mediterrânea minimalista** — tons minerais, respiro e foco absoluto na peça. Probabilidade: 0,05.
3. **Organic editorial de joalheria** — uma vitrine solar, tátil e sofisticada, com sensação de caderno de campanha. Probabilidade: 0,08.

### Design Movement
Organic editorial de joalheria, inspirado em editoriais de moda com matéria natural, luz de fim de tarde e direção de arte artesanal.

### Core Principles
1. **A peça é o centro:** imagens amplas, títulos curtos e decisões de compra sem ruído.
2. **Calor sem excesso:** o luxo aparece nos materiais, no ritmo e nos detalhes, não em ornamentos genéricos.
3. **Descoberta guiada:** coleções, busca e filtros ajudam a navegar sem transformar a vitrine em um grid impessoal.
4. **Operação visível:** o painel traduz estoque e aceitação em decisões simples para a dona da loja.

### Color Philosophy
Base marfim quente e areia rosada para criar luminosidade e sensação tátil; marrom café para texto e contraste; verde oliva queimado como cor proprietária, conectando natureza, confiança e sofisticação. Dourado fosco apenas como acento, nunca como preenchimento dominante.

### Layout Paradigm
Composição editorial assimétrica: hero dividido entre manifesto e imagem, seções que alternam largura e respiro, cards com proporções variadas e blocos de dados no painel usando alinhamento de revista em vez de dashboard genérico.

### Signature Elements
- Linha fina oliva com pequenos marcadores de coleção.
- Etiquetas de campanha em formato de cápsula com textura de papel.
- Motivo de arco orgânico em fundos, recortes e estados vazios.

### Interaction Philosophy
Interações devem parecer gestos de curadoria: hover revela detalhe e preço, filtros deslizam com suavidade, ações do painel confirmam mudanças sem susto e o carrinho permanece acessível sem tirar a pessoa da vitrine.

### Animation
Entradas suaves em fade + deslocamento de 12px; imagens com scale de 1 para 1,025 no hover; números do painel entram em stagger curto; evitar parallax pesado e animações contínuas que desviem do produto. Respeitar `prefers-reduced-motion`.

### Typography System
Serif editorial de alto contraste para títulos e chamadas; sans geométrica humanista para interface, preços e dados. Escala com títulos de impacto, subtítulos com tracking amplo e corpo confortável. A implementação usa fontes web seguras/importadas apenas quando disponíveis, com fallback elegante.

### Brand Essence
Semijoias para quem transforma o cotidiano em ocasião — delicada, solar, intencional.

### Brand Voice
Voz próxima, sensorial e segura; fala como uma curadora que ajuda a escolher, não como um catálogo agressivo.
- “Peças para acompanhar o seu ritmo.”
- “Seu brilho de todos os dias, escolhido com intenção.”

### Wordmark & Logo
Wordmark “Gabi” em serif editorial com um arco aberto substituindo o ponto do “i”; “SEMIJOIAS” em caixa alta pequena e espaçada. Em telas menores, usar o arco como selo ao lado do nome.

### Signature Brand Color
**Oliva Solar** `#7F8760`, usado em CTAs secundários, marcadores de coleção e sinais de estoque saudável.

## Estrutura de pastas
- `client/src/pages/` — vitrine, coleções, produto, institucionais e painel.
- `client/src/components/` — header, cards de produto, carrinho, badges e componentes de painel.
- `client/src/lib/` — cliente tRPC, utilitários de moeda e dados de apresentação.
- `server/` — routers tRPC, autenticação, consultas e adaptadores para Shopify/insights.
- `drizzle/` — schema e migrações de usuários/insights/campanhas.
- `public/manus-routes.json` — manifesto de rotas.

## Dependências e limites
- Não expor tokens Shopify no cliente, no repositório ou em logs.
- Usar o fluxo oficial de integração Shopify e recursos oficiais do Storefront API/cart quando a integração estiver ativa.
- O painel deve funcionar com estado vazio amigável antes da conexão do Shopify, mas não inventar uma conexão real.
- A primeira entrega prioriza base da vitrine, carrinho visual, painel e estrutura de dados; recomendações de IA serão uma evolução sobre os eventos de estoque/vendas.
