import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const fallbackProducts = [
  { id: 1, handle: "brinco-aurora", name: "Brinco Aurora", category: "Brincos", price: 129.9, tag: "Mais amado", image: "/assets/brinco-aurora.webp", description: "Argola orgânica com banho dourado e presença leve." },
  { id: 2, handle: "colar-orbita", name: "Colar Órbita", category: "Colares", price: 159.9, tag: "Novo", image: "/assets/colar-orbita.webp", description: "Pingente oval delicado para usar sozinho ou em camadas." },
  { id: 3, handle: "anel-flora", name: "Anel Flora", category: "Anéis", price: 99.9, tag: "Esgotando", image: "/assets/brinco-aurora.webp", description: "Forma aberta inspirada em pétalas, ajustável e confortável." },
  { id: 4, handle: "pulseira-linha", name: "Pulseira Linha", category: "Pulseiras", price: 119.9, tag: "Essencial", image: "/assets/colar-orbita.webp", description: "Uma linha dourada para acompanhar todos os dias." },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Home() {
  const catalog = trpc.storefront.products.useQuery();
  const products = catalog.data?.products?.length ? catalog.data.products.map((product) => ({
    id: product.id,
    handle: product.handle,
    name: product.title,
    category: product.productType || "Semijoias",
    price: Number(product.priceRange.minVariantPrice.amount),
    tag: product.availableForSale ? "Disponível" : "Esgotado",
    image: product.featuredImage?.url || fallbackProducts[0].image,
    description: product.description || "Uma peça escolhida para acompanhar o seu ritmo.",
    variantId: product.variants.nodes[0]?.id,
  })) : fallbackProducts.map((product) => ({ ...product, variantId: undefined }));
  const [activeCategory, setActiveCategory] = useState("Tudo");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Array<string | number>>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const checkout = trpc.storefront.checkout.useMutation({
    onSuccess: (result) => {
      if (result.checkoutUrl) window.location.href = result.checkoutUrl;
      else toast.error("O checkout estará disponível assim que o catálogo Shopify estiver conectado.");
    },
    onError: () => toast.error("Não foi possível abrir o checkout agora."),
  });

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "Tudo" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, search]);

  const addToCart = (id: string | number) => { setCart((current) => [...current, id]); setCartOpen(true); };
  const startCheckout = () => {
    const lines = cartProducts.flatMap((product) => product.variantId ? [{ merchandiseId: product.variantId, quantity: 1 }] : []);
    if (!lines.length || lines.length !== cartProducts.length) {
      toast.info("A curadoria demo está pronta para conhecer seu catálogo Shopify.");
      return;
    }
    checkout.mutate({ lines });
  };
  const cartProducts = cart.map((id) => products.find((product) => product.id === id)!).filter(Boolean);
  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="site-shell">
      <div className="topline"><span>Frete grátis nas compras acima de R$ 249</span><span className="topline-desktop">Pagamento seguro · Troca fácil em até 7 dias</span></div>
      <header className="navbar">
        <button className="icon-button mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><Menu size={20} /></button>
        <a className="wordmark" href="/" aria-label="Gabi Semijoias"><span className="wordmark-mark">⌒</span><span>gabi</span><small>SEMIJOIAS</small></a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#colecoes">Coleções</a><a href="#mais-amados">Mais amados</a><a href="#sobre">Sobre a Gabi</a><a href="#atendimento">Atendimento</a>
        </nav>
        <div className="nav-actions"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar peça" aria-label="Buscar peça" /></div><button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Abrir sacola"><ShoppingBag size={19} /><b>{cart.length}</b></button></div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy"><p className="eyebrow">Coleção essência · 2026</p><h1>Seu brilho de todos os dias, escolhido com intenção.</h1><p className="hero-text">Semijoias para acompanhar o seu ritmo. Formas orgânicas, brilho na medida e aquele detalhe que transforma o simples em especial.</p><a className="button button-dark" href="#colecoes">Descobrir a coleção <ArrowRight size={16} /></a><div className="hero-proof"><span><Check size={14} /> Banho premium</span><span><Check size={14} /> Envio em 24h</span></div></div>
          <div className="hero-image"><img src="/assets/hero-jewelry.webp" alt="Semijoias douradas sobre pedra clara" /><div className="hero-note"><span>01</span><p>Peças para<br /><em>acompanhar</em> você.</p></div></div>
        </section>

        <section className="campaign container"><div><p className="eyebrow">Presente com significado</p><h2>Uma pequena escolha.<br /><em>Um grande gesto.</em></h2></div><div className="campaign-side"><p>Embalagem especial para presentear e um bilhete escrito por você. Porque os melhores detalhes são os que ficam.</p><a href="#colecoes" className="text-link">Escolher um presente <ArrowRight size={15} /></a></div></section>

        <section id="colecoes" className="catalog container"><div className="section-heading"><div><p className="eyebrow">Curadoria Gabi</p><h2>Peças que falam<br /><em>por você.</em></h2></div><p className="section-intro">Do essencial ao inesquecível, encontre a peça que combina com o seu agora.</p></div><div className="catalog-toolbar"><div className="category-tabs">{["Tudo", "Brincos", "Colares", "Anéis", "Pulseiras"].map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><button className="filter-button">Ordenar <ChevronDown size={15} /></button></div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-tag">{product.tag}</span><button className="heart-button" aria-label={`Favoritar ${product.name}`}><Heart size={17} /></button><button className="quick-add" onClick={() => addToCart(product.id)}>Adicionar à sacola <ArrowRight size={14} /></button></div><div className="product-info"><div><p className="product-category">{product.category}</p><h3><a href={`/produto/${product.handle}`}>{product.name}</a></h3></div><strong>{money(product.price)}</strong></div><p className="product-description">{product.description}</p></article>)}</div></section>

        <section id="mais-amados" className="manifesto container"><div className="manifesto-mark">✳</div><p className="eyebrow">O jeito Gabi de escolher</p><h2>Não é sobre ter mais.<br /><em>É sobre ter o certo.</em></h2><p>Peças que atravessam tendências, combinam entre si e fazem sentido na sua rotina. Curadoria com intenção para você usar muito — e amar sempre.</p><a href="#sobre" className="text-link">Conheça nossa história <ArrowRight size={15} /></a></section>

        <section className="newsletter"><div className="newsletter-inner container"><div><p className="eyebrow">Carta da Gabi</p><h2>Um pouco de brilho<br /><em>na sua caixa de entrada.</em></h2></div><form onSubmit={(event) => event.preventDefault()}><p>Novidades, lançamentos e achadinhos — sem exagero.</p><div className="email-field"><input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" /><button className="button button-olive">Quero receber <ArrowRight size={15} /></button></div></form></div></section>
      </main>

      <footer id="atendimento" className="footer"><div className="container footer-grid"><div><a className="wordmark footer-brand" href="/"><span className="wordmark-mark">⌒</span><span>gabi</span><small>SEMIJOIAS</small></a><p>Peças para acompanhar<br />o seu ritmo.</p></div><div><p className="footer-title">Explorar</p><a href="#colecoes">Coleções</a><a href="#mais-amados">Mais amados</a><a href="#sobre">Sobre a Gabi</a></div><div><p className="footer-title">Ajuda</p><a href="#atendimento">Fale com a gente</a><a href="#politicas">Trocas e devoluções</a><a href="#politicas">Entrega e privacidade</a></div><div><p className="footer-title">Siga de perto</p><a href="https://www.instagram.com/gabi_semi_joias/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="/admin">Acesso da equipe ↗</a></div></div><div className="container footer-bottom"><span>© 2026 Gabi Semijoias</span><span>Feito com intenção.</span></div></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">Sua seleção</p><h2>Sacola ({cart.length})</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar sacola"><X size={20} /></button></div>{cartProducts.length === 0 ? <div className="empty-cart"><ShoppingBag size={32} /><p>Sua sacola está esperando<br />por uma peça especial.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Continuar olhando</button></div> : <><div className="cart-items">{cartProducts.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>{money(product.price)}</p></div><button className="icon-button" onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label="Remover item"><X size={15} /></button></div>)}</div><div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="button button-olive checkout-button" onClick={startCheckout} disabled={checkout.isPending}>{checkout.isPending ? "Abrindo checkout..." : <>Ir para o checkout <ArrowRight size={16} /></>}</button><small className="checkout-note">Checkout seguro via Shopify</small></>}</aside></div>}
    </div>
  );
}
