# TODO — Gabi Semijoias

## Loja orgânica, responsiva e orientada à descoberta
- [x] A loja tem uma página inicial com apresentação da marca, destaques de semijoias, lançamentos e chamadas promocionais.
- [x] A experiência é responsiva para celulares, tablets e computadores, com navegação rápida e visual orgânico.
- [x] A vitrine usa a direção editorial orgânica definida em `plan.md`, com hierarquia clara, imagens de produto em destaque e microinterações suaves.

## Catálogo e descoberta de produtos
- [x] O catálogo é organizado por coleções ou categorias, com busca e filtros para facilitar a descoberta das peças.
- [x] As páginas de produto exibem foto, descrição, preço, disponibilidade, quantidade e benefícios da peça, com rota dinâmica por handle.
- [x] Produtos, preços, variações, estoque e pedidos ficam centralizados no Shopify; a vitrine consulta o Storefront API e não duplica o catálogo comercial.
- [x] A loja de desenvolvimento foi semeada com exatamente dois produtos-demo: Brinco Aurora por R$ 129,90 e Colar Órbita por R$ 159,90, ambos com imagens processadas no Shopify.

## Carrinho e checkout
- [x] O carrinho permite adicionar itens, editar a seleção, remover itens e ver o resumo do pedido.
- [x] O checkout server-side está integrado ao Shopify e abre o `checkoutUrl` quando os produtos reais estão disponíveis.

## Campanhas e páginas de apoio
- [x] A loja exibe uma campanha de presente, uma seção editorial de coleção, uma newsletter e chamadas de curadoria.
- [x] Existem páginas institucionais e de atendimento para sobre a marca, contato, políticas de troca, privacidade e entrega.
- [x] A estrutura inicial de SEO inclui idioma, title, description, theme-color e manifesto de rotas para as páginas públicas.

## Painel protegido e gestão facilitada
- [x] Existe um painel administrativo em `/admin`, protegido por autenticação Manus OAuth e verificação do papel `admin`, sem acesso público aos indicadores.
- [x] O painel oferece visão geral, produtos em destaque, alerta de estoque baixo, leitura de saída/aceitação e sugestões editáveis de campanhas.
- [x] A gestão operacional de produtos, preços, estoque e pedidos abre pelo Shopify Admin a partir do painel, preservando a fonte de verdade comercial.
- [ ] Conectar plugins de alertas/notificações persistentes para eventos operacionais e canais definidos pela equipe.
- [ ] Substituir os dados de demonstração de desempenho por indicadores persistidos de pedidos, aceitação e giro de estoque.
- [ ] Evoluir a “Gabi IA · beta” para recomendações geradas pelo LLM gerenciado, com prioridade baseada em maior aceitação e maior saída de estoque.

## Integração comercial
- [x] A integração Shopify foi habilitada pelo fluxo oficial da plataforma, com tokens gerenciados fora do código-fonte.
- [x] O site tem fallback visual seguro enquanto o catálogo real não estiver disponível e passa a usar os produtos Shopify assim que a API responde.
